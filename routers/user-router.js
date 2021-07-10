const express = require('express')
const user_controller = require('../controllers/user-controller')
const router = express.Router()
router.get('/signIn',user_controller.renderSignIn)
router.get('/',user_controller.renderSignUp)
router.post('/logIn', user_controller.login)
router.post('/register',user_controller.createUser)
router.get('/user/:username',user_controller.getUserByName)
module.exports = router
