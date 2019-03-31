const {config} = require('../../config')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../app')
chai.should()
chai.use(chaiHttp)

const User = require('../../models/user')

describe('user tests', () => {
	it('POST user was registration', done => {
		chai
			.request(app)
			.post('/api/auth/signup')
			.send({
				email: config.tests.userEmail,
				password: config.tests.userPassForTest,
				name: config.tests.name,
				lastName: config.tests.lastName,
				city: config.tests.city
			})
			.end((err, res) => {
				res.should.have.status(500)
				done()
			})
	})

	// it('DELETE user', done => {
	// 	chai
	// 		.request(app)
	// 		.delete('/api/auth/deleteUser')
	// 		.end((err, res) => {
	// 			res.should.have.status(200)
	// 		})
	// })

	// it ('POST create new user', done => {
	// 	chai
	// 		.request(app)
	// 		.post('/api/auth/signup')
	// 		.send({
	// 			email: config.tests.userEmail,
	// 			password: config.tests.userPassForTest,
	// 			name: config.tests.name,
	// 			lastName: config.tests.lastName,
	// 			city: config.tests.city
	// 		})
	// 		.end((err, res) => {
	// 			res.should.have.status(201)
	// 			res.body.should.be.a('object')
	// 			res.body.userId.should.be.a('string')
	// 			done()
	// 		})
	// })
})