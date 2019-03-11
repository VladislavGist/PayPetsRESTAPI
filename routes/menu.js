const express = require('express')
const router = express.Router()

const menuController = require('../controllers/menu')

router.get('/getAnimalCategories', menuController.getCategories)

module.exports = router