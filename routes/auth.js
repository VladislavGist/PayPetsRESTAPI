const express = require('express')
const {body} = require('express-validator/check')
const router = express.Router()

const authController = require('../controllers/auth')

const User = require('../models/user')

router.put('/signup', [
	body('email')
		.trim()
		.isEmail()
		.withMessage('Введите правильный email')
		.custom((value, {next}) => {
			return User
				.findOne({email: value})
				.then(user => {
					if (user) {
						return Promise.reject('Пользователь с таким email уже существует')
					}
				})
				.catch(err => error({err, next}))
		})
		.normalizeEmail(),
	body('password')
		.trim()
		.isLength({min: 6}),
	body('name')
		.trim()
		.not()
		.isEmpty()
], authController.signup)

module.exports = router