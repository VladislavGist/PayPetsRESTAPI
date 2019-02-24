const express = require('express')
const {body} = require('express-validator/check')
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

router.post('/login', authController.login)

module.exports = router