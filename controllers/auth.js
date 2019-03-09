const {validationResult} = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const {error, multipleMessageError} = require('../utils')

const {config} = require('../config')
const {sendMail} = require('../nodemailer')

const User = require('../models/user')
const Post = require('../models/post')

const ENVAIRONMENT = process.env.NODE_ENV

exports.signup = (req, res, next) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		const errorsToString = errors.array()

		error({
			statusCode: 422,
			err: {message: multipleMessageError(errorsToString)}
		})
	}

	const {
		name,
		lastName,
		email,
		password
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
				name,
				lastName
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

	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		const errorsToString = errors.array()

		error({
			statusCode: 422,
			err: {message: multipleMessageError(errorsToString)}
		})
	}

	let loggedUser;

	const checkUser = async () => {
		return await User
			.findOne({email})
			.then(user => {
				if (!user) return Promise.reject('Пользователь с таким email не найден')
				else if (user.active === false) {
					return Promise.reject('Пользователь с таким email уже зарегистрирован. Восстановите аккаунт.')
				} else {
					loggedUser = user
					return bcrypt.compare(password, user.password)
				}

			})
	}

	const getUserPosts = async isEqual => {
		if (!isEqual) return Promise.reject('Пароль неверен')
		else return await Post
			.find({creatorId: loggedUser._id})
			.then(postsList => Promise.resolve(postsList))
	}

	const sendUser = async (postsList = []) => {
		const token = jwt.sign({
			email: loggedUser.email,
			userId: loggedUser._id.toString()
		}, config.auth.secretKey,
		{expiresIn: '1h'})
		res
			.status(200)
			.json({
				role: loggedUser.status,
				posts: postsList,
				email: loggedUser.email,
				city: loggedUser.city,
				name: loggedUser.name,
				lastName: loggedUser.lastName,
				token,
				userId: loggedUser._id.toString()
			})
	}

	const main = async () => {
		try {
			const isEqualPassword = await checkUser()
			const postsList = await getUserPosts(isEqualPassword)
			await sendUser(postsList)
		} catch (err) {
			error({err: {message: err}, statusCode: 400, next})
		}
	}

	main()
}

exports.getUserData = (req, res, next) => {
	const {userId} = req

	let loggedUser;

	const checkUser = async () => {
		return await User
			.findOne({_id: userId})
			.then(user => {
				if (user) {
					loggedUser = user
					return Promise.resolve()
				}
			})
	}

	const getUserPosts = async () => {
		return await Post
			.find({creatorId: loggedUser._id})
			.then(postsList => Promise.resolve(postsList))
	}

	const sendUser = async (postsList = []) => {
		const token = jwt.sign({
			email: loggedUser.email,
			userId: loggedUser._id.toString()
		}, config.auth.secretKey,
		{expiresIn: '1h'})
		res
			.status(200)
			.json({
				role: loggedUser.status,
				posts: postsList,
				city: loggedUser.city,
				email: loggedUser.email,
				name: loggedUser.name,
				lastName: loggedUser.lastName,
				token,
				userId: loggedUser._id.toString()
			})
	}

	const main = async () => {
		try {
			const isEqualPassword = await checkUser()
			const postsList = await getUserPosts(isEqualPassword)
			await sendUser(postsList)
		} catch (err) {
			error({err: {message: err}, statusCode: 400, next})
		}
	}

	main()
}

exports.resetPassword = (req, res, next) => {
	const errors = validationResult(req)
	const {email} = req.query

	if (!errors.isEmpty()) {
		const errorsToString = errors.array()

		error({
			statusCode: 422,
			err: {message: multipleMessageError(errorsToString)}
		})
	}

	crypto.randomBytes(32, (err, buffer) => {
		if (err) error({err})

		const token = buffer.toString('hex')
		const {
			devPort,
			prodPort
		} = config

		User
			.findOne({email})
			.then(user => {
				if (!user) return Promise.reject('Пользователь с таким email не найден')

				user.resetToken = token
				user.resetTokenExpiration = Date.now() + 3600000
				return user.save()
			})
			.then(() => {
				return sendMail({
					to: email,
					from: 'paypets.org',
					subject: 'Сброс пароля на сайте PayPets',
					html: `
						<h2>Приветствуем. Вы запросили сброс пароля на сайте PayPets</h2>
						<p>Наша команда благодарит Вас за использование нашего сервиса. Вместе мы делаем мир лучше.</p>
						<a href="http://localhost:8090/#/addNewPassword/${token}">Cброса пароля</a>
					`
				})
			})
			.then(() => {
				res.status(200).json({
					message: 'На Вашу почту было отправлено письмо для восстановления пароля. Возможно оно попало в папку spam.'
				})
			})
			.catch(err => error({err, next}))
	})
}

exports.addNewPassword = (req, res, next) => {
	const errors = validationResult(req)
	const {token, password} = req.body
	let resetUser;

	console.log({ password, token })

	if (!errors.isEmpty()) {
		const errorsToString = errors.array()

		error({
			statusCode: 422,
			err: {message: multipleMessageError(errorsToString)}
		})
	}

	User
		.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})
		.then(user => {
			if (!user) return Promise.reject('Пользователь не найден')

			resetUser = user
			return bcrypt.hash(password, 12)
		})
		.then(hashedPassword => {
			resetUser.password = hashedPassword
			resetUser.resetToken = undefined
			resetUser.resetTokenExpiration = undefined
			resetUser.active = true
			return resetUser.save()
		})
		.then(() => res.status(200).json({message: 'Пароль изменен'}))
		.catch(err => error({err, next}))
}

exports.changeUserData = (req, res, next) => {
	const errors = validationResult(req)
	const {userId} = req
	const {
		name,
		lastName,
		city,
		email,
		oldPassword,
		newPassword
	} = req.body

	let updateUser

	if (!errors.isEmpty()) {
		const errorsToString = errors.array()

		error({
			statusCode: 422,
			err: {message: multipleMessageError(errorsToString)}
		})
	}

	User
		.findById(userId)
		.then(user => {
			if (!user) return Promise.reject('Пользователь не найден')

			if (user._id.toString() === userId) {
				updateUser = user
				return Promise.resolve()
			}
			return Promise.reject('Нет прав на изменение')
		})
		.then(() => {
			updateUser.name = name || updateUser.name
			updateUser.email = email || updateUser.email
			updateUser.lastName = lastName || updateUser.lastName
			updateUser.city = city || updateUser.city

			return updateUser.save()
		})
		.then(() => {
			if (oldPassword || newPassword) {
				if (oldPassword && newPassword) return bcrypt.compare(oldPassword, updateUser.password)
				return Promise.reject('Заполните все поля пароля')
			}
			return Promise.resolve()
		})
		.then(checkOldPassword => {
			if (checkOldPassword === false) {
				return Promise.reject('Старый пароль не верен')
			} else {
				if (checkOldPassword) return bcrypt.hash(newPassword, 12)
			}

			if (checkOldPassword === undefined) return Promise.resolve()
		})
		.then(hashedPassword => {
			if (hashedPassword) {
				updateUser.password = hashedPassword
				return updateUser.save()
			}
			return Promise.resolve()
		})
		.then(() => {
			return User
				.findById(userId)
				.then(user => {
					res.status(200).json({
						role: user.status,
						city: user.city,
						email: user.email,
						name: user.name,
						lastName: user.lastName,
						userId: user._id.toString()
					})
				})
		})
		.catch(err => error({err, next}))
}

exports.deleteUser = (req, res, next) => {
	const {userId} = req

	User
		.findById(userId)
		.then(user => {
			if (user._id.toString() === userId) {
				user.active = false
				return user.save()
			}
		})
		.then(() => res.status(200).json({message: 'Ваш аккаунт деактивирован. Вы всегда сможете его восстановить'}))
		.catch(err => error({err, next}))
}