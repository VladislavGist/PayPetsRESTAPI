const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const feedRoutes = require('./routes/feed')
const app = express()

app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    })
    next()
})

app.use('/feed', feedRoutes)

mongoose
    .connect('mongodb+srv://Vlad:FAwckF2BRdLaDj1H@cluster0-rscbz.mongodb.net/messages?retryWrites=true', {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('server started')
        app.listen(8080)
    })
    .catch(err => console.log({err}))