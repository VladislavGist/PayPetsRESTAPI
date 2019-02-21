const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const mongoose = require('mongoose')

const mongoClient = callback => {
    MongoClient
        .connect('mongodb+srv://Vlad:FAwckF2BRdLaDj1H@cluster0-rscbz.mongodb.net/test?retryWrites=true', {
            useNewUrlParser: true
        })
        .then(client => {
            console.log('db connected')
            callback(client)
        })
        .catch(err => console.log({err}))
}

module.exports = mongoClient