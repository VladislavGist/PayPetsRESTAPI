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

    if (!errors.isEmpty() || !files) {
		const noneFileError = !files ? 'Добавьте файл в формате .png, .jpeg или .jpg' : null
		const errorsToString = errors.array()

		error({
			statusCode: 422,
			err: {message: noneFileError || multipleMessageError(errorsToString)}
		})
	}

	const {
		title,
		content
	} = req.body

	const post = new Post({
		title,
		content,
		imageUrl: files.map(o => o.path),
		creator: userId
	})

	post
		.save()
		.then(() => User.findById(userId))
		.then(user => {
			if (!user) return Promise.reject('Пользователь не найден')

			if (user._id.toString() === userId) {
				user.posts.push(post)
				return user.save()
			}
			return Promise.reject('Нет прав на изменение')
		})
		.then(() => res.status(200).json(post))
		.catch(err => error({err, next}))
	
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
			res.status(201).json({
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

// update
exports.updatePost = (req, res, next) => {
	const {id} = req.params
	const {
		title,
		content,
		creator
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