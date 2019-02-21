const express = require('express')
const bodyParser = require('body-parser')
const mongoConnect = require('./util/database')
const feedRoutes = require('./routes/feed')
const app = express()

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    })
    next()
})

app.use('/feed', feedRoutes)

mongoConnect(() => {
    console.log('server started')
    app.listen(8080)
})