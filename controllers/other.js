const _ = require('lodash')

const {
	citysList,
	error
} = require('../utils')

const Post = require('../models/post')

exports.getAllCitysList = (req, res, next) => {

	const getCityCounters = async () => {
		return await Post
			.aggregate([
				{$match: {
					moderate: 'resolve',
					active: true,
				}},
				{$group: {
						_id: '$city',
						count: {$sum: 1}
					}
				}
			])
			.then(res => res)
	}

	const mappingCountersWithCityList = async cityCounters => {
		return citysList.map(city => {
			let findedItems = _.find(cityCounters, o => o._id === city)
			if (findedItems) {
				return { city: findedItems._id, count: findedItems.count }
			} else {
				return { city, count: 0 }
			}
		})
	}

	const main = async () => {
		try {
			const cityCounters = await getCityCounters()
			const finalList = await mappingCountersWithCityList(cityCounters)

			res
				.status(200)
				.json({finalList})
		} catch(err) {
			error({err, next})
		}
	}

	main()
}