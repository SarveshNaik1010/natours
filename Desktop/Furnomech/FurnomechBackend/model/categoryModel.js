const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
    imgCategory: String,
    imgType: String,
    imagePath: String,
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;