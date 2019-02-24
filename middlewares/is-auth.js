const jwt = require('jsonwebtoken')
const {error} = require('../utils')

const {config} = require('../config')

module.exports = (req, res, next) => {
	let decodedToken

	try {
		const token = req.get('Authorization').split(' ')[1]
		decodedToken = jwt.verify(token, config.auth.secretKey)
	} catch (err) {
		error({
			err: {message: 'Пользователь не аунтифицирован'},
			statusCode: 401,
			next
		})
	}

	if (decodedToken) {
		req.userId = decodedToken.userId
		next()
	}
} 