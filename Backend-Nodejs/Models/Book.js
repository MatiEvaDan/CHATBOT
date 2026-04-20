const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
        maxlength: [100, 'Author cannot exceed 100 characters']
    },
    year: {
        type: Number,
        required: false,
        min: 0,
        max: new Date().getFullYear()
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);