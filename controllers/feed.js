const {validationResult} = require('express-validator/check')
const Post = require('../models/post')

exports.getPosts = (req, res, next) => {
    Post
        .find()
        .then(posts => {
            if(!posts) {
                const error = new Error('Not find post')
                error.statusCode = 404
                throw error
            }
            res.status(201).json(posts)
        })
        .catch(err => console.log('err get posts', {err}))
}

exports.createPost = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()){
        return res.status(422).json({
            message: 'Validation faild, data is incorrect',
            errors: errors.array()
        })
    }

    const title = req.body.title
    const content = req.body.content
    const imageUrl = req.body.imageUrl

    const post = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        creator: {name: 'Max'}
    })

    post
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Post create success',
                post: result
            })
        })
        .catch(err => console.log(err))
}

exports.getPost = (req, res, next) => {
    const postId = req.params.id

    console.log({ postId })

    Post
        .findById(postId)
        .then(post => {
            if(!post) {
                const error = new Error('Not find post')
                error.statusCode = 404
                throw error
            }
            res.status(201).json(post)
        })
        .catch(err => console.log('err get post by id'))
}