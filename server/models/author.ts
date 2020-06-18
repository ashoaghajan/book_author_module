const mongoose2 = require('mongoose');
const Schema2 = mongoose2.Schema;

const authorSchema = new Schema2({
    name: String,
    age: Number
});

module.exports = mongoose2.model('Author', authorSchema);