const express = require('express')
const book_controller = require('../controllers/book-controller')
const router = express.Router()
router.post('/addBook',book_controller.addBook)
router.get('/books',book_controller.getBooks)
router.get('/book/:id',book_controller.getBookById)
module.exports = router
