const express = require('express')
const router = express.Router()
const controller = require('./../controller/user-controller')

router.get('/', controller.home)
router.post('/signup', controller.signupUser)
router.post('/login', controller.loginUser)

module.exports = router