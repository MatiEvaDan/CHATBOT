const Book = require('../Models/Book.js');

class BookRepository {
     // CREATE - Add a new book
  async create(bookData) {
    try {
      const book = new Book(bookData);
      return await book.save();
    } catch (error) {
      throw new Error(`Error creating book: ${error.message}`);
    }
  }
  // RREAD - Get all books
  async getAll() {
  try {
    return await Book.find().sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Error fetching books: ${error.message}`);
  }
}
   // READ - Get book by ID
  async findById(bookId) {
    try {
      const book = await Book.findById(bookId);
      if (!book) {
        throw new Error('Book not found');
      }
      return book;
    } catch (error) {
      throw new Error(`Error fetching book: ${error.message}`);
    }
  }
  async deleteById(bookId) {
    try {
      return await Book.findByIdAndDelete(bookId);
    } catch (error) {
      throw new Error(`Error deleting book: ${error.message}`);
    }
  }
}
module.exports = new BookRepository();