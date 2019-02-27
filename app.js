// libs
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const fs = require('fs')
const { error, changeLog } = require('./utils')
const app = express()

// routes
const auth = require('./routes/auth')
const feedRoutes = require('./routes/feed')

// configuration settings
const ENVAIRONMENT = process.env.NODE_ENV

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    {flags: 'a'}
)

const {
	config: {
		dbUrl,
		devPort,
		prodPort
	}	
} = require('./config')

// middlewares
app.use(helmet())
app.use(compression())
app.use(morgan('combined', {stream: accessLogStream}))
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
app.use('/auth', auth)
app.use('/feed', feedRoutes)
app.use((error, req, res, next) => {
	res.status(error.statusCode || 500).json(error.message)
	next()
})

// connection and start server
mongoose
    .connect(dbUrl, {
        useNewUrlParser: true
    })
    .then(() => {
        changeLog(`Server started on "${ENVAIRONMENT}" envaironment`)
        app.listen(ENVAIRONMENT === 'develop' ? devPort : prodPort)
    })
    .catch(err => error(null, err.message))