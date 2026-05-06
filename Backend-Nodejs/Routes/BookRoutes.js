const express = require('express');
const multer = require('multer');
const router = express.Router();
const bookController = require('../Controllers/BookController.js');
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/books', bookController.create);
router.delete('/books/:id', bookController.deleteById);
router.get('/books/:id', bookController.findById);
router.get('/books', bookController.getAll);
//router.post('/image', upload.single('image'),bookController.uploadImage);
router.post('/image', (req, res) => {
  console.log("POST IMAGE RAMT");
  res.send("POST virker");
});

//redeploy

module.exports = router;