const { citysList } = require('../utils')

exports.getAllCitysList = (req, res, next) => {
	res
		.status(200)
		.json({
			citysList
		})
}