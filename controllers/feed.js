const {validationResult} = require('express-validator/check')
const {error} = require('../utils')
const Post = require('../models/post')

const {config} = require('../config')

// create
exports.createPost = (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
		error({
			statusCode: 422,
			err: {message: 'Data is uncorrect'},
			next
		})
	}

	const {
		title,
		content,
		imageUrl,
		creator
	} = req.body

    const post = new Post({
        title,
        content,
		imageUrl,
		creator
    })

    post
        .save()
        .then(result => res.status(201).json(result))
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
		imageUrl,
		creator
	} = req.body

	Post
		.findById(id)
		.then(post => {
			post.title = title || post.title
			post.content = content || post.content
			post.imageUrl = imageUrl || post.imageUrl
			post.creator = creator || post.creator

			return post.save()
		})
		.then(result => res.status(201).json(result))
		.catch(err => error({err, next}))
}

// delete
exports.deletePost = (req, res, next) => {
	const {id} = req.params

	Post
		.findById(id)
		.then(post => post.delete())
		.then(() => res.status(200).json({message: 'Post deleted'}))
		.catch(err => error({err, next}))
}