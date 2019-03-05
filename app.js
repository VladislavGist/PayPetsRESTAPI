// libs
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const fs = require('fs')
const multer = require('multer')
const { error, changeLog } = require('./utils')
const isAuth = require('./middlewares/is-auth')
const app = express()

// routes
const auth = require('./routes/auth')
const feed = require('./routes/feed')
const feedRead = require('./routes/feedRead')
const other = require('./routes/other')

// configuration settings
const ENVAIRONMENT = process.env.NODE_ENV

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    {flags: 'a'}
)

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/posts')
    },
    filename: (req, file, cb) => {
        cb(null, `${req.userId}-${Math.random() * 1000}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    const mimetype = file.mimetype
    const validMimetypes = ['image/png', 'image/jpg', 'image/jpeg']
    if (validMimetypes.includes(mimetype)) cb(null, true)
    else cb(null, false)
}

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
app.use('/api/feed', isAuth, multer({storage: fileStorage, fileFilter}).array('image'))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    })
    next()
})
app.use('/api/auth', auth)
app.use('/api/feed', feed)
app.use('/api/other', other)
app.use('/api/feedRead', feedRead)
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
    .catch(err => error({err: err.message}))