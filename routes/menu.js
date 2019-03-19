const express = require('express')
const {check} = require('express-validator/check')
const router = express.Router()

const menuController = require('../controllers/menu')

router.get('/getAnimalCategories', menuController.getCategories)

router.get('/getMenu', [
	check('city')
		.optional()
		.trim()
		.not()
		.isEmpty()
		.withMessage('Укажите город'),
	check('animalType')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Укажите животное')
], menuController.getMenu)

router.get('/typesList', menuController.getTypesList)

module.exports = router