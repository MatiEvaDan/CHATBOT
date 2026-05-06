const bookService = require('../Services/BookService.js')
const { BlobServiceClient } = require('@azure/storage-blob');
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
   

async uploadImage(req, res) {
  try {
    // 1. tjek om der er en fil
    if (!req.file) {
      return res.status(400).json({ message: "Ingen fil" });
    }

    // 2. hent data
    const buffer = req.file.buffer;
    const fileName = Date.now() + "-" + req.file.originalname;

    // 3. forbind til Azure
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING
    );

    const containerClient = blobServiceClient.getContainerClient(
      process.env.AZURE_CONTAINER_NAME
    );

    // 4. lav blob
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    // 5. upload
    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: {
        blobContentType: req.file.mimetype
      }
    });

    // 6. få URL
    const imageUrl = blockBlobClient.url;

    // 7. send tilbage
    res.json({ imageUrl });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload fejlede" });
  }
}
}

module.exports = new BookController();