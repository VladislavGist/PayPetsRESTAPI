const express = require('express')
const {body} = require('express-validator/check')
const isAuth = require('../middlewares/is-auth')
const router = express.Router()

const feedController = require('../controllers/feed')

// create
router.post(
	'/post',
	isAuth,
	[
		body('title')
			.trim()
			.isLength({min: 5})
			.withMessage('Введите корректное название'),
		body('content')
			.trim()
			.isLength({min: 5})
			.withMessage('Введите корректное описание'),
		body('imageUrl')
			.not()
			.isEmpty()
			.withMessage('Добавьте изображение')
	], 
	feedController.createPost
)

// read
router.get('/posts', feedController.getAllPostsList)

router.get('/post/:id', feedController.getPostById)

// update
router.put('/post/:id', 
	isAuth,
	[
		body('title')
			.optional()
			.trim()
			.isLength({min: 5})
			.withMessage('Введите корректное название'),
		body('content')
			.optional()
			.trim()
			.isLength({min: 5})
			.withMessage('Введите корректное описание'),
		body('imageUrl')
			.optional()
			.not()
			.isEmpty()
			.withMessage('Добавьте изображение')
	],
feedController.updatePost)

// delete
router.delete('/post/:id', isAuth, feedController.deletePost)

module.exports = router