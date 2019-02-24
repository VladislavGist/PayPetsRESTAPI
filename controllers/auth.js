const {validationResult} = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {error, multipleMessageError} = require('../utils')
const {config} = require('../config')

const User = require('../models/user')

exports.signup = (req, res, next) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		const errorsToString = errors.array()

		error({
			statusCode: 422,
			err: {message: multipleMessageError(errorsToString)},
			next
		})
	}

	const {
		email,
		password,
		name
	} = req.body

	User
		.findOne({email})
		.then(user => {
			if (user) {
				return Promise.reject('Пользователь с таким email уже существует')
			}
		})
		.then(() => bcrypt.hash(password, 12))
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
		.catch(err => error({err: {message: err}, next}))
}

exports.login = (req, res, next) => {
	const {
		email,
		password
	} = req.body

	let loggedUser;

	User
		.findOne({email})
		.then(user => {
			if (!user) {
				res
					.status(200)
					.json({
						message: 'Пользователь с таким email не найден'
					})
			} else {
				loggedUser = user
				return bcrypt.compare(password, user.password)
			}

		})
		.then(isEqual => {
			if (!isEqual) {
				res
					.status(200)
					.json({
						message: 'Пароль неверен'
					})
			} else {
				const token = jwt.sign({
					email: loggedUser.email,
					userId: loggedUser._id.toString()
				}, config.auth.secretKey,
				{
					expiresIn: '1h'
				})
				res
					.status(200)
					.json({
						token,
						userId: loggedUser._id.toString()
					})
			}
		})
		.catch(err => error({err, next}))
} 