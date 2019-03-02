const express = require('express')
const router = express.Router()

const feedController = require('../controllers/feed')

// read
router.get('/posts', feedController.getAllPostsList)

router.get('/post/:id', feedController.getPostById)

module.exports = router