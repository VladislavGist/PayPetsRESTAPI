const {validationResult} = require('express-validator/check')
const Post = require('../models/post')

exports.getPosts = (req, res, next) => {
    console.log('this')
    res.status(200).json({
        posts: [{
            title: 'My title',
            content: 'My content'
        }],
        imageUrl: 'images/my image.jpg',
    })
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