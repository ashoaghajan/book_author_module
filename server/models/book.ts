const mongoose1 = require('mongoose');
const Schema = mongoose1.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
});

module.exports = mongoose1.model('Book', bookSchema);