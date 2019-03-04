const express = require('express')
const router = express.Router()

const cityController = require('../controllers/city')

// read
router.get('/allCitysList', cityController.getAllCitysList)

module.exports = router