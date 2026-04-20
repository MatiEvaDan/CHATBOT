const express = require('express');
const router = express.Router();
const bookController = require('../Controllers/BookController.js');

router.post('/books', bookController.create);
router.delete('/books/:id', bookController.deleteById);
router.get('/books/:id', bookController.findById);
router.get('/books', bookController.getAll);



module.exports = router;