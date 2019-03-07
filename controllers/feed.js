const {validationResult} = require('express-validator/check')
const _ = require('lodash')
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

	console.log(req.body)

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
			price
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
	const {page} = req.query
	const currentPage = page || 1
	const maxPostsOnPage = config.posts.maxPostsOnPage
	let totalItems;

	Post
		.find({active: true})
		.countDocuments()
		.then(count => {
			totalItems = count

			return Post
						.find({active: true})
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
        .findById(id)
        .then(post => {
			if (!post) return Promise.reject('Пост не найден')
			res.status(201).json(post)
		})
        .catch(err => error({err, next}))
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
		creator,
		animalType,
		postType,
		city,
		phoneNumber,
		price
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

			post.title = title || post.title
			post.content = content || post.content
			post.imageUrl = (files && Array.prototype.concat(post.imageUrl, files.map(o => o.path))) || post.imageUrl
			post.creator = creator || post.creator
			post.animalType = animalType || post.animalType
			post.postType = postType || post.postType
			post.city = city || post.city
			post.phoneNumber = phoneNumber || post.phoneNumber
			post.price = price || post.price

			if (post.creator.toString() === userId) return post.save()
			return Promise.reject('Нет прав на изменение')
		})
		.then(result => res.status(201).json(result))
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

				post.active = status
				return post.save()
			})
			.then(() => res.status(200).json({message: 'Статус объявления успешно изменен'}))
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

exports.postsFilter = (req, res, next) => {
	const {city, animalType, postType, page} = req.query
	const currentPage = page || 1
	const maxPostsOnPage = config.posts.maxPostsOnPage
	let totalItems;

	Post
		.find({city, animalType, postType})
		.countDocuments()
		.then(count => {
			totalItems = count

			return Post
						.find({city, animalType, postType})
						.skip((currentPage - 1) * maxPostsOnPage)
						.limit(maxPostsOnPage)
		})
		.then(postsList => 
			res.status(201).json({
				posts: postsList,
				totalItems
			}))
        .catch(err => error({err, next}))
}

// delete
exports.deletePost = (req, res, next) => {
	const {id} = req.params
	const {userId} = req

	Post
		.findById(id)
		.then(post => {
			if (!post) return Promise.reject('Пост не найден')

			if (post.creator.toString() === userId) {
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

			if (post.creator.toString() === userId) {
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