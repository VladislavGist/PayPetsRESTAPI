const express = require('express')
const {body} = require('express-validator/check')
const isAuth = require('../middlewares/is-auth')
const router = express.Router()

const authController = require('../controllers/auth')

router.post('/signup', [
	body('email')
		.trim()
		.isEmail()
		.withMessage('Введите правильный email')
		.normalizeEmail(),
	body('password')
		.trim()
		.isLength({min: 6})
		.withMessage('Пароль должен содержать минимум 6 символов'),
	body('name')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Введите Ваше имя')
], authController.signup)

router.post('/login', [
	body('email')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Введите email'),
	body('password')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Введите пароль')
],authController.login)

router.post('/resetPassword',
	[
		body('email')
			.trim()
			.isEmail()
			.withMessage('Введите email')
	],
authController.resetPassword)

router.post('/addNewPassword',
	[
		body('password')
			.trim()
			.isLength({min: 6})
			.withMessage('Пароль должен содержать минимум 6 символов'),
		body('token')
			.trim()
			.not()
			.isEmpty()
			.withMessage('Токен отсутствует')
	],
authController.addNewPassword)

router.put('/changeUserData',
	isAuth,
	[
		body('email')
			.optional()
			.trim()
			.isEmail()
			.withMessage('Введите правильный email')
			.normalizeEmail(),
		body('oldPassword')
			.optional()
			.trim()
			.isLength({min: 6})
			.withMessage('Пароль должен содержать минимум 6 символов'),
		body('newPassword')
			.optional()
			.trim()
			.isLength({min: 6})
			.withMessage('Новый пароль должен содержать минимум 6 символов'),
		body('name')
			.optional()
			.trim()
			.not()
			.isEmpty()
			.withMessage('Введите Ваше имя')
	],	
authController.changeUserData)

router.post('/deleteUser', isAuth, authController.deleteUser)

module.exports = router