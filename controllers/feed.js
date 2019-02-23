const {validationResult} = require('express-validator/check')
const { error } = require('../utils')
const Post = require('../models/post')

exports.getPosts = (req, res, next) => {
    Post
        .find()
        .then(posts => res.status(201).json(posts))
        .catch(err => error({err, next}))
}

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
        .then(result => {
            res.status(201).json({
                message: 'Post create success',
                post: result
            })
        })
        .catch(err => error({err, next}))
}

exports.getPost = (req, res, next) => {
    const { id } = req.params

    Post
        .findById(id)
        .then(post => res.status(201).json(post))
        .catch(err => error({err, next}))
}