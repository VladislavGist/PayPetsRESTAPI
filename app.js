const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const feedRoutes = require('./routes/feed')
const app = express()

const ENVAIRONMENT = process.env.NODE_ENV

const {
	config: {
		dbUrl,
		devPort,
		prodPort
	}	
} = require('./config')

const { error, changeLog } = require('./utils')

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

app.use((error, req, res, next) => {
	res.status(error.statusCode || 500).json(error.message)
	next()
})

mongoose
    .connect(dbUrl, {
        useNewUrlParser: true
    })
    .then(() => {
        changeLog(`Server started on "${ENVAIRONMENT}" envaironment`)
        app.listen(ENVAIRONMENT === 'dev' ? devPort : prodPort)
    })
    .catch(err => error(null, err.message))