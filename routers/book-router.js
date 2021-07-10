const express = require('express')
const book_controller = require('../controllers/book-controller')
const router = express.Router()
router.post('/addBook',book_controller.addBook)
module.exports = router
