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
		body('animalType')
			.trim()
			.isLength({min: 3})
			.withMessage('Укажите тип животного'),
		body('postType')
			.trim()
			.isLength({min: 3})
			.withMessage('Укажите тип объявления'),
		body('city')
			.trim()
			.isLength({min: 3})
			.withMessage('Укажите город'),
		body('phoneNumber')
			.trim()
			.isLength({min: 11})
			.withMessage('Укажите номер телефона'),
		body('price')
			.optional()
			.trim()
			.isNumeric()
			.withMessage('Укажите корректную цену')
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
		body('animalType')
			.optional()
			.trim()
			.isLength({min: 3})
			.withMessage('Укажите тип животного'),
		body('postType')
			.optional()
			.trim()
			.isLength({min: 3})
			.withMessage('Укажите тип объявления'),
		body('city')
			.optional()
			.trim()
			.isLength({min: 3})
			.withMessage('Укажите город'),
		body('phoneNumber')
			.optional()
			.trim()
			.isLength({min: 11})
			.withMessage('Укажите номер телефона'),
		body('price')
			.optional()
			.trim()
			.isNumeric()
			.withMessage('Укажите корректную цену'),
		body('active')
			.optional()
			.trim()
			.withMessage('Укажите статус')
	],
feedController.updatePost)

router.put('/moderatePost',
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