const _ = require('lodash')

const Post = require('../models/post')

const {error} = require('../utils')

const animalKinds = [
	{ type: 'cat', translate: 'Кошки' },
	{ type: 'dog', translate: 'Собаки' },
	{ type: 'parrot', translate: 'Попугаи' },
	{ type: 'hamster', translate: 'Хомяки' },
	{ type: 'mouse', translate: 'Мыши / крысы' },
	{ type: 'hare', translate: 'Зайцы / кролики' },
	{ type: 'guineapig', translate: 'Морские свинки' },
	{ type: 'champ', translate: 'Хорьки' },
	{ type: 'snak', translate: 'Змеи' },
	{ type: 'iguana', translate: 'Игуаны' },
	{ type: 'turtle', translate: 'Черепахи' },
	{ type: 'snail', translate: 'Улитки' },
	{ type: 'fish', translate: 'Рыбки' },
	{ type: 'insects', translate: 'Насекомые' },
	{ type: 'horse', translate: 'Лошади' },
	{ type: 'cow', translate: 'Коровы / быки' },
	{ type: 'pig', translate: 'Свиньи' },
	{ type: 'goat', translate: 'Козы' },
	{ type: 'sheep', translate: 'Овцы' },
	{ type: 'domesticbird', translate: 'Домашняя птица' },
	{ type: 'other', translate: 'Другие' }
]

exports.getCategories = (req, res, next) => {
	const {city} = req.query

	const matchPrams = {
		moderate: 'resolve',
		active: true,
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