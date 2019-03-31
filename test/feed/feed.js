const {config} = require('../../config')
const fs = require('fs')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../app')
chai.should();

const Post = require('../../models/post')
const User = require('../../models/user')

chai.use(chaiHttp);

describe('feed tests', () => {
	let userData = null
	
	beforeEach(done => {
		chai
			.request(app)
			.post('/api/auth/login')
			.set('Content-Type', 'application/json')
			.send({email: 'spanshine@mail.ru', password: config.tests.userPassForTest })
			.then(res => userData = res.body)

		Post.remove({}, err => done())
	})

	describe('GET posts', () => {
		it('it should GET 0 feeds', done => {
			chai
				.request(app)
				.get('/api/feedRead/posts')
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.posts.should.be.a('array')
					res.body.posts.length.should.be.eql(0)
					res.body.totalItems.should.be.eql(0)
					done()
				})
		})
	})

	describe('POST /api/feed/post', () => {
		it('it should create new feed', done => {
			const feed = {
				title: 'Название объявления для теста 01',
				content: 'Описание объявления для теста. Описание объявления для теста. Описание объявления для теста.',
				animalType: 'reptile',
				postType: 'buy',
				city: 'Москва',
				phoneNumber: '+79856677722',
				price: 5000
			}

			User
				.findOne({_id: userData.userId})
				.then(user => {
					user.posts = []
					user.save()
				})

			chai
				.request(app)
				.post('/api/feed/post')
				.set('Authorization', `Bearer ${userData.token}`)
				.type('form')
				.field(feed)
				.attach('file', fs.readFileSync(`${__dirname}/testImg1.jpg`), 'testImg1.jpg')
				.attach('file', fs.readFileSync(`${__dirname}/testImg2.jpg`), 'testImg2.jpg')
				.end((err, result) => {
					result.should.have.status(200)
					done()
			})
		})
	})

	// describe('UPDATE /api/post/:id', () => {
	// 	it
	// })
})