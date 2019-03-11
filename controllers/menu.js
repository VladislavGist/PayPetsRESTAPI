const _ = require('lodash')
const {validationResult} = require('express-validator/check')

const Post = require('../models/post')

const {error, multipleMessageError} = require('../utils')
const {animalKinds, menuData} = require('./menuDatas')

exports.getCategories = (req, res, next) => {
	const {city} = req.query

	const matchPrams = {
		moderate: 'resolve',
		active: true
	}

	if (city) matchPrams.city = city

	const getCategoriesCounters = async () => {
		return await Post
			.aggregate([
				{$match: matchPrams},
				{$group: {
						_id: '$animalType',
						count: {$sum: 1}
					}
				}
			])
			.then(res => res)
	}

	const mappingCountersWithAnimalsList = async animalCounters => {
		return animalKinds.map(animalObj => {
			let findedItems = _.find(animalCounters, o => o._id === animalObj.type)
			if (findedItems) {
				return { type: findedItems._id, translate: _.find(animalKinds, o => o.type === findedItems._id).translate, count: findedItems.count }
			} else {
				return { type: animalObj.type, translate: animalObj.translate, count: 0 }
			}
		})
	}

	const main = async () => {
		try {
			const animalCounters = await getCategoriesCounters()
			const finalList = await mappingCountersWithAnimalsList(animalCounters)

			res
				.status(200)
				.json(finalList)
		} catch(err) {
			error({err, next})
		}
	}

	main()
}

exports.getMenu = (req, res, next) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		const errorsToString = errors.array()

		error({
			statusCode: 422,
			err: {message: multipleMessageError(errorsToString)}
		})
	}

	const {animalType, city} = req.query

	const matchPrams = {
		moderate: 'resolve',
		active: true
	}

	if (city) matchPrams.city = city
	if (animalType) matchPrams.animalType = animalType
	
	// console.log(matchPrams)

	const getTypesCounters = async () => {
		return await Post
			.aggregate([
				{$match: matchPrams},
				{$group: {
						_id: '$postType',
						count: {$sum: 1}
					}
				}
			])
			.then(res => res)
	}

	const matchLists = async typeCounters => {
		menuFindedObject = _.find(menuData, o => o.type === animalType)

		console.log(animalType, menuFindedObject.categoryNames.names)

		if (!menuFindedObject) return Promise.reject('Такого животного нет в списке')
		else {
			menuFindedObject.categoryNames.names.forEach(namesItem => {
				namesItem.count = 0
			})

			typeCounters.forEach(countObj => {
				menuFindedObject.categoryNames.names.forEach(namesItem => {
					if (namesItem.type === countObj._id) {
						namesItem.count = 0
						namesItem.count = countObj.count
					}
				})
			})

			return Promise.resolve(menuFindedObject)
		}
	}

	const main = async () => {
		try {
			const typeCounters = await getTypesCounters()
			const finalList = await matchLists(typeCounters)

			res
				.status(200)
				.json(finalList)
		} catch(err) {
			error({err, next})
		}
	}

	main()
}