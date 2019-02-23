const error = ({
	statusCode,
	err,
	next
}) => {
	const error = new Error(err.message)
	error.statusCode = statusCode || 500
	next(error)
}

const changeLog = message => {
	const text = `<==== ${message} ====>`

	console.log(text)
}

exports.error = error
exports.changeLog = changeLog