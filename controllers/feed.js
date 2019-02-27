const {validationResult} = require('express-validator/check')
const {error, multipleMessageError} = require('../utils')

const Post = require('../models/post')
const User = require('../models/user')

const {config} = require('../config')

// create
exports.createPost = (req, res, next) => {
	const errors = validationResult(req)
	const {userId, file} = req

    if (!errors.isEmpty() || !file) {
		const noneFileError = !file ? 'Добавьте файл в формате .png, .jpeg или .jpg' : null
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
		imageUrl: file.path,
		creator: userId
	})

	post
		.save()
		.then(() => User.findById(userId))
		.then(user => {
			user.posts.push(post)
			return user.save()
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
		.find()
		.countDocuments()
		.then(count => {
			totalItems = count

			return Post
						.find()
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
        .then(post => res.status(201).json(post))
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

	const {userId, file} = req
	const errors = validationResult(req)

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
			post.title = title || post.title
			post.content = content || post.content
			post.imageUrl = (file && file.path) || post.imageUrl
			post.creator = creator || post.creator

			if (post.creator.toString() === userId) return post.save()
			return Promise.reject('Нет прав на изменение')
		})
		.then(result => res.status(201).json(result))
		.catch(err => error({err, next}))
}

// delete
exports.deletePost = (req, res, next) => {
	const {id} = req.params
	const {userId} = req

	Post
		.findById(id)
		.then(post => {
			if (post.creator.toString() === userId) return post.delete()
			return Promise.reject('Нет прав на изменение')
		})
		.then(() => User.findById(userId))
		.then(user => {
			user.posts.pull(id)
			return user.save()
		})
		.then(() => res.status(200).json({message: 'Post deleted'}))
		.catch(err => error({err, next}))
}