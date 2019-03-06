const express = require('express')
const router = express.Router()

const oterController = require('../controllers/other')

// read
router.get('/allCitysList', oterController.getAllCitysList)

module.exports = router