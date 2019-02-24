const express = require('express')
const {body} = require('express-validator/check')
const isAuth = require('../middlewares/is-auth')
const router = express.Router()

const feedController = require('../controllers/feed')

// create
router.post('/post', [
    body('title')
        .trim()
        .isLength({min: 5}),
    body('content')
        .trim()
		.isLength({min: 5}),
	isAuth
], feedController.createPost)

// read
router.get('/posts', feedController.getAllPostsList)

router.get('/post/:id', feedController.getPostById)

// update
router.put('/post/:id', isAuth, feedController.updatePost)

// delete
router.delete('/post/:id', isAuth, feedController.deletePost)

module.exports = router