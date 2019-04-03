const {config} = require('../../config')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../app')
chai.should()
chai.use(chaiHttp)

module.exports = () => describe('OTHER tests', () => {
    it('GET allCitysList [unauth]', done => {
        chai
            .request(app)
            .get('/api/other/allCitysList')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.finalList.should.be.a('array')
                done()
            })
    })

    it('GET menu', done => {
        chai
            .request(app)
            .get('/api/menu/getMenu')
            .query({
                animalType: 'cat'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                done()
            })
    })

    it('GET categories', done => {
        chai
            .request(app)
            .get('/api/menu/getAnimalCategories')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
    })

    it('GET types list', done => {
        chai
            .request(app)
            .get('/api/menu/typesList')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
    })
})