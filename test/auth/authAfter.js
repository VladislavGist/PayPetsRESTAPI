const {config} = require('../../config')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../app')
chai.should()
chai.use(chaiHttp)

const User = require('../../models/user')

module.exports = () => describe('user tests', () => {
	let authTokenUser = null

	before(done => {
		chai
			.request(app)
			.post('/api/auth/login')
			.set('Content-Type', 'application/json')
			.send({
				email: config.tests.userEmail,
				password: config.tests.userPassForTest
			})
			.then(res => {
				authTokenUser = res.body.token
				done()
			})
	})

	it('DELETE undelete user if [unauth user]', done => {
		chai
			.request(app)
			.get('/api/auth/deleteUser')
			.end((err, res) => {
				res.should.have.status(401)
				done()
			})
	})

	it('DELETE delete user if [auth user]', done => {
		chai
			.request(app)
			.get('/api/auth/deleteUser')
			.set('Authorization', `Bearer ${authTokenUser}`)
			.end((err, res) => {
				res.should.have.status(200)
				done()
			})
	})

	after(done => {
		chai
			.request(app)
			.put('/api/auth/changeUserData')
			.set('Authorization', `Bearer ${authTokenUser}`)
			.send({
				active: true
			})
			.end((err, res) => done())
	})
})