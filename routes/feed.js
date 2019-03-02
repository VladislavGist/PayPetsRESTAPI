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
			.withMessage('Введите корректное описание')
	], 
	feedController.createPost
)

// read
router.get('/moderationListPosts', isAuth, feedController.moderationListPosts)

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

router.post('/moderatePost',
	isAuth,
	body('postId')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Укажите id объявления'),
	body('status')
		.trim()
		.isBoolean()
		.withMessage('Назначте статус объявления'),
feedController.moderatePost)

// delete
router.delete('/post/:id', isAuth, feedController.deletePost)

router.delete('/deletePostImage/:id',
	isAuth,
	[
		body('imageUrl')
			.trim()
			.not()
			.isEmpty()
			.withMessage('Добавьте url изображения')
	],
feedController.deleteImage)

module.exports = router