const {config} = require('../../config')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../app')
chai.should()
chai.use(chaiHttp)

const User = require('../../models/user')

module.exports = () => describe('user tests', () => {
	let userIdVariable = null
	let authTokenUser = null
	let resetTokenUser = null

	before(done => {
		User.remove({}, err => done())
	})

	it ('POST create new user', done => {
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
				res.should.have.status(201)
				res.body.should.be.a('object')
				res.body.userId.should.be.a('string')
				done()
			})
	})

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

	it('POST login user', done => {
		chai
			.request(app)
			.post('/api/auth/login')
			.send({
				email: config.tests.userEmail,
				password: config.tests.userPassForTest
			})
			.end((err, res) => {
				let {
					role,
					posts,
					email,
					city,
					name,
					lastName,
					token,
					userId
				} = res.body

				authTokenUser = token
				userIdVariable = userId

				res.should.have.status(200)
				role.should.be.a('string')
				posts.should.be.a('array')
				email.should.be.a('string')
				city.should.be.a('string')
				name.should.be.a('string')
				lastName.should.be.a('string')
				token.should.be.a('string')
				userId.should.be.a('string')

				done()
			})
	})

	it('GET get user data [via token]', done => {
		chai
			.request(app)
			.get('/api/auth/getUserData')
			.set('Authorization', `Bearer ${authTokenUser}`)
			.end((err, res) => {
				res.should.have.status(200)
				done()
			})
	})

	it('GET get user data [without token]', done => {
		chai
			.request(app)
			.get('/api/auth/getUserData')
			.end((err, res) => {
				res.should.have.status(401)
				done()
			})
	})

	it('PUT change user data [auth user]', done => {
		chai
			.request(app)
			.put('/api/auth/changeUserData')
			.set('Authorization', `Bearer ${authTokenUser}`)
			.send({
				name: 'Андрей',
				lastName: 'Короблев',
				city: 'Архангельск',
				email: config.tests.userEmail,
				oldPassword: config.tests.userPassForTest,
				newPassword: config.tests.userPassForTest
			})
			.end((err, res) => {
				let {
					role,
					city,
					email,
					name,
					lastName,
					userId
				} = res.body

				res.should.have.status(200)
				role.should.be.a('string')
				city.should.be.a('string')
				email.should.be.a('string')
				name.should.be.a('string')
				lastName.should.be.a('string')
				userId.should.be.a('string')

				done()
			})
	})

	it('PUT change user data [unauth user]', done => {
		chai
			.request(app)
			.put('/api/auth/changeUserData')
			.send({
				name: 'Андрей',
				lastName: 'Короблев',
				city: 'Архангельск',
				email: config.tests.userEmail,
				oldPassword: config.tests.userPassForTest,
				newPassword: config.tests.userPassForTest
			})
			.end((err, res) => {
				res.should.have.status(401)

				done()
			})
	})

	it('GET reset password', done => {
		chai
			.request(app)
			.get('/api/auth/resetPassword')
			.query({
				email: config.tests.userEmail
			})
			.then(res => {
				return User
					.findOne({_id: userIdVariable})
					.then(user => {
						res.should.have.status(200)
						return Promise.resolve(user.resetToken)
					})
					
			})
			.then(resetToken => {
				resetToken.should.be.a('string')
				resetTokenUser = resetToken
				done()
			})
	})

	it('POST add new password', done => {
		chai
			.request(app)
			.post('/api/auth/addNewPassword')
			.send({
				password: config.tests.userPassForTest,
				token: resetTokenUser
			})
			.end((err, result) => {
				result.should.have.status(200)

				done()
			})
	})
})