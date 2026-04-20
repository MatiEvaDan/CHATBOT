const bookService = require('../Services/BookService.js')
class BookController {
    async create(req,res){
        try{
            const book = await bookService.createBook(req.body);
            res.status(201).json({
                success: true,
                message: 'Book created succesfully',
                data: book
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

async getAll(req, res) {
  try {
    const books = await bookService.findAllBooks();

    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
    
    async findById(req,res){
        try {
            const book = await bookService.findBookById(req.params.id);
            res.status(200).json({
              success: true,
              message: 'Book found',
              data: book  
            });
            
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
            
        }
    }
    async deleteById(req,res){
        try {
            const book = await bookService.deleteBookById(req.params.id);
            res.status(200).json({
                success:true,
                message:'Book deleted',
                data: book
            });
            
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
            
        }
    }
}

module.exports = new BookController();