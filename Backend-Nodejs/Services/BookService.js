const BookRepository = require('../Repositories/BookRepository.js');

class BookService {
    async createBook(bookData) {
        return await BookRepository.create(bookData)
    }
    async findBookById(bookId){
        return await BookRepository.findById(bookId)
    }
    async deleteBookById(bookId){
        return await BookRepository.deleteById(bookId)
    }
    async findAllBooks() {
        return await BookRepository.getAll();
    }
}

module.exports = new BookService();