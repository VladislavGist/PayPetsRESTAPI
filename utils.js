const fs = require('fs')

const citysList = [
	'Москва',
	'Санкт-Петербург',
	'Волгоград',
	'Екатеринбург',
	'Казань',
	'Краснодар',
	'Нижний Новгород',
	'Пермь',
	'Ростов-на-Дону',
	'Самара',
	'Уфа',
	'Челябинск',
	'Адыгея',
	'Архангельская обл.',
	'Астраханская обл.',
	'Башкортостан',
	'Белгородская обл.',
	'Брянская обл.',
	'Владимирская обл.',
	'Волгоградская обл.',
	'Вологодская обл.',
	'Воронежская обл.',
	'Дагестан',
	'Ивановская обл.',
	'Ингушетия',
	'Кабардино-Балкария',
	'Калининградская обл.',
	'Калмыкия',
	'Калужская обл.',
	'Карачаево-Черкесия',
	'Карелия',
	'Кировская обл.',
	'Коми',
	'Костромская обл.',
	'Краснодарский край',
	'Крым',
	'Курганская обл.',
	'Курская обл.',
	'Ленинградская обл.',
	'Липецкая обл.',
	'Марий Эл',
	'Мордовия',
	'Московская обл.',
	'Мурманская обл.',
	'Ненецкий АО',
	'Нижегородская обл.',
	'Новгородская обл.',
	'Оренбургская обл.',
	'Орловская обл.',
	'Пензенская обл.',
	'Пермский край',
	'Псковская обл.',
	'Ростовская обл.',
	'Рязанская обл.',
	'Самарская обл.',
	'Саратовская обл.',
	'Свердловская обл.',
	'Северная Осетия',
	'Смоленская обл.',
	'Ставропольский край',
	'Тамбовская обл.',
	'Татарстан',
	'Тверская обл.',
	'Тульская обл.',
	'Удмуртия',
	'Ульяновская обл.',
	'Челябинская обл.',
	'Чеченская республика',
	'Чувашия',
	'Ярославская обл.'
]

const error = ({
	statusCode,
	err,
	next
}) => {
	let mutateErrorMessage = typeof err === 'object' ? err.message : err
	const error = new Error(mutateErrorMessage)
	error.statusCode = statusCode || 500
	
	if (next) next(error)
	else throw error
}

const multipleMessageError = arrayErrors => {
	let message = ''
	
	arrayErrors.forEach((obj, idx) => {
		message += `${obj.msg}${idx + 1 === arrayErrors.length ? '' : ', '}`
	})

	return message
}

const deleteFile = (filePath, next) => {
	fs.unlink(filePath, err => {
		if (err) {
			error({err, next})
		}
	})
}

const changeLog = message => {
	const text = `<==== ${message} ====>`

	console.log(text)
}

exports.error = error
exports.citysList = citysList
exports.changeLog = changeLog
exports.multipleMessageError = multipleMessageError
exports.deleteFile = deleteFile