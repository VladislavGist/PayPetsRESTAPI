const express = require('express')
const {body} = require('express-validator/check')

const feedController = require('../controllers/feed')

const router = express.Router()

// create
router.post('/post', [
    body('title')
        .trim()
        .isLength({min: 5}),
    body('content')
        .trim()
		.isLength({min: 5})
], feedController.createPost)

// read
router.get('/posts', feedController.getAllPostsList)

router.get('/post/:id', feedController.getPostById)

// update
router.put('/post/:id', feedController.updatePost)

// delete
router.delete('/post/:id', feedController.deletePost)

module.exports = router