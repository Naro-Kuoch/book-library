const express = require('express')
const user_controller = require('../controllers/user-controller')
const router = express.Router()
router.post('/', user_controller.login)
router.post('/register',user_controller.createUser)
module.exports = router
