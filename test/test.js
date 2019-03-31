const assert = require('chai').assert

const {
	getCategories
} = require('../controllers/menu')

describe('Menu', () => {
	it('get categories', () => {
		// const result = 3 + 5
		// expect(result).to.equal(8)

		const result = getCategories()
		console.log({result})
		// assert.isArray(result, 'bla')
	})
})