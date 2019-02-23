const {validationResult} = require('express-validator/check')
const {error} = require('../utils')
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

	
}