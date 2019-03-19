const {validationResult} = require('express-validator/check')
const _ = require('lodash')

const moment = require('moment')
moment.locale('ru')

const {error, multipleMessageError, deleteFile} = require('../utils')

const Post = require('../models/post')
const User = require('../models/user')

const {config} = require('../config')

// create
exports.createPost = (req, res, next) => {
	const errors = validationResult(req)
	const {userId, files} = req

	const {
		title,
		content,
		animalType,
		postType,
		city,
		phoneNumber,
		price
	} = req.body

    if (!errors.isEmpty() || !files) {
		const noneFileError = !files ? 'Добавьте файл в формате .png, .jpeg или .jpg' : null
		const errorsToString = errors.array()

		files.forEach(o => deleteFile(o.path))

		error({
			statusCode: 422,
			err: {message: noneFileError || multipleMessageError(errorsToString)}
		})
	}

	const getUserName = async () => {
		return User
			.findById(userId)
			.then(user => Promise.resolve(user.name))
	}

	const addNewPost = async userName => {
		const post = new Post({
			title,
			content,
			imageUrl: files.map(o => o.path),
			creatorId: userId,
			creatorName: userName,
			animalType,
			postType,
			city,
			phoneNumber,
			price,
			stopDate: moment().add(25, 'days').format()
		})

		return post
			.save()
			.then(() => User.findById(userId))
			.then(user => {
				if (!user) return Promise.reject('Пользователь не найден')

				if (user._id.toString() === userId) {
					user.posts.push(post)
					user.save()
					return post
				}
				return Promise.reject('Нет прав на изменение')
			})
	}

	const main = async () => {
		try {
			const userName = await getUserName()
			await addNewPost(userName)
			res.status(200).json({ message: 'Объявление успешно создано и отправлено на модерацию' })
		} catch (err) {
			error({err, next})
		}
	}
	
	main()
}

// read
exports.getAllPostsList = (req, res, next) => {
	const {
		city,
		animalType,
		postType,
		active,
		moderate,
		page
	} = req.query

	const createQuery = params => {
		const resultQueryData = {
			stopDate: {
				$gt: moment().format()
			}
		}
	
		for (let name in params) {
			if (params[name] && name !== 'page') resultQueryData[name] = params[name]
		}
	
		return resultQueryData
	}

	const currentPage = page || 1
	const maxPostsOnPage = config.posts.maxPostsOnPage
	let totalItems;

	const queryParams = createQuery({
		city,
		animalType,
		postType,
		active,
		moderate
	})

	Post
		.find(queryParams)
		.countDocuments()
		.then(count => {
			totalItems = count

			return Post
						.find(queryParams)
						.skip((currentPage - 1) * maxPostsOnPage)
						.limit(maxPostsOnPage)
		})
		.then(postsList => 
			res.status(200).json({
				posts: postsList,
				totalItems
			}))
        .catch(err => error({err, next}))
}

exports.getPostById = (req, res, next) => {
	const {id} = req.params

    Post
        .find({
			_id: id,
			active: true,
			moderate: 'resolve'
		})
        .then(post => res.status(201).json(post[0]))
        .catch(() => error({err: {message: 'Пост не найден'}, next}))
}

exports.moderationListPosts = (req, res, next) => {
	const {userId} = req
	const {page} = req.query

	const chechUserStatus = async () => {
		return await User
			.findById(userId)
			.then(user => {
				if (user.status === 'moderator') return Promise.resolve()
				return Promise.reject('У Вас нет доступа для просмотра этой информации')
			})
	}

	const getModerationPostsList = async () => {
		const currentPage = page || 1
		const maxPostsOnPage = config.posts.maxPostsOnPage
		let totalItems;

		return await Post
			.find({active: false})
			.countDocuments()
			.then(count => {
				totalItems = count

				return Post
							.find({active: false})
							.skip((currentPage - 1) * maxPostsOnPage)
							.limit(maxPostsOnPage)
			})
			.then(postsList => Promise.resolve({
				posts: postsList,
				totalItems
			}))
	}

	const main = async () => {
		try {
			await chechUserStatus()
			const postsList = await getModerationPostsList()
			res.status(200).json(postsList)
		} catch (err) {
			error({err, next})
		}
	}

	main()
}

// update
exports.updatePost = (req, res, next) => {
	const {id} = req.params
	const {
		title,
		content,
		creatorName,
		animalType,
		postType,
		city,
		phoneNumber,
		price,
		active
	} = req.body

	
	const {userId, files} = req
	const errors = validationResult(req)
	const errorMaxLengthAddingFiler = files && files.length > 5 ? 'Максимум 5 изображений' : null

    if (!errors.isEmpty() || errorMaxLengthAddingFiler) {
		const errorsToString = errors.array()

		error({
			statusCode: 422,
			err: {message: errorMaxLengthAddingFiler || multipleMessageError(errorsToString)}
		})
	}

	Post
		.findById(id)
		.then(post => {
			if (!post) return Promise.reject('Пост не найден')

			const currentChangerUser = post.creatorId.toString()

			post.title = title || post.title
			post.content = content || post.content
			post.imageUrl = (files && Array.prototype.concat(post.imageUrl, files.map(o => o.path))) || post.imageUrl
			post.creatorName = creatorName || post.creatorName
			post.animalType = animalType || post.animalType
			post.postType = postType || post.postType
			post.city = city || post.city
			post.phoneNumber = phoneNumber || post.phoneNumber
			post.price = price || post.price
			post.active = (active || active === false) ? active : post.active

			if (currentChangerUser === userId) return post.save()
			return Promise.reject('Нет прав на изменение')
		})
		.then(() => res.status(201).json({message: 'Успешно изменено'}))
		.catch(err => error({err, next}))
}

exports.moderatePost = (req, res, next) => {
	const errors = validationResult(req)
	const {userId} = req 
	const {postId, status} = req.body

	if (!errors.isEmpty()) {
		const errorsToString = errors.array()

		error({
			statusCode: 422,
			err: {message: multipleMessageError(errorsToString)}
		})
	}

	const checkUserStatus = async () => {
		return await User
			.findById(userId)
			.then(user => {
				if (user.status === 'moderator') return Promise.resolve()
				else return Promise.reject('У Вас нет прав для изменения статуса объявлений')
			})
	}

	const changeActiveStatusPosts = async () => {
		return await Post
			.findById(postId)
			.then(post => {
				if (!post) return Promise.reject('Пост не найден')

				post.moderate = status
				return post.save()
			})
			.then(post => res.status(200).json({post, message: 'Статус объявления успешно изменен'}))
	}

	const main = async () => {
		try {
			await checkUserStatus()
			await changeActiveStatusPosts()
		} catch (err) {
			error({err, next})
		}
	}

	main()
}

// delete
exports.deletePost = (req, res, next) => {
	const {id} = req.params
	const {userId} = req

	Post
		.findById(id)
		.then(post => {
			if (!post) return Promise.reject('Пост не найден')

			if (post.creatorId.toString() === userId) {
				const imageUrlList = post.imageUrl

				if (imageUrlList && imageUrlList.length > 0) {
					imageUrlList.forEach(url => deleteFile(url, next));
				}
				return post.delete()
			}
			return Promise.reject('Нет прав на изменение')
		})
		.then(() => User.findById(userId))
		.then(user => {
			user.posts.pull(id)
			return user.save()
		})
		.then(() => res.status(200).json({message: 'Пост удален'}))
		.catch(err => error({err, next}))
}

exports.deleteImage = (req, res, next) => {
	const errors = validationResult(req)
	const {userId} = req
	const {id} = req.params
	const {imageUrl} = req.body

	if (!errors.isEmpty()) {
		const errorsToString = errors.array()

		error({
			statusCode: 422,
			err: {message: multipleMessageError(errorsToString)}
		})
	}

	Post
		.findById(id)
		.then(post => {
			if (!post) return Promise.reject('Пост не найден')

			if (post.creatorId.toString() === userId) {
				const imageUrlList = post.imageUrl

				if (imageUrlList && imageUrlList.length > 0) {
					deleteFile(imageUrl, next)
				} else {
					return Promise.reject('Нет изображений')
				}
				post.imageUrl.remove(imageUrl)
				return post.save()
			}
			return Promise.reject('Нет прав на изменение')
		})
		.then(() => res.status(200).json({message: 'Изображение удалено'}))
		.catch(err => error({err, next}))
}