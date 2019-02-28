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

router.put('/changeUserData', isAuth, authController.changeUserData)

router.post('/deleteUser', isAuth, authController.deleteUser)

module.exports = router