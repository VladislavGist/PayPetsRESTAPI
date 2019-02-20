const {validationResult} = require('express-validator/check')

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

    res.status(201).json({
        message: 'Post create success',
        post: {
            id: new Date().toISOString(),
            title,
            content
        }
    })
}