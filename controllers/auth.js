const {validationResult} = require('express-validator/check')
const {error} = require('../utils')
const bcrypt = require('bcryptjs')

const User = require('../models/user')

exports.signup = (req, res, next) => {
	if (!validationResult(req).isEmpty()) {
		error({
			statusCode: 422,
			err: {message: 'Введите корректные данные'},
			next
		})
	}

	const {
		email,
		password,
		name
	} = req.body

	bcrypt
		.hash(password, 12)
		.then(hashedPassword => {
			const user = new User({
				email,
				password: hashedPassword,
				name
			})
			return user.save()
		})
		.then(result =>
			res
				.status(201)
				.json({
					message: 'Вы успешно зарегистрированы',
					userId: result._id
				})
		)
		.catch(err => error({err, next}))
}

exports.login = (req, res, next) => {
	const {
		email,
		password
	} = req.body
} 