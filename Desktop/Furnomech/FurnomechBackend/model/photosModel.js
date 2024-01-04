const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema({
  photo: String,
  category: String,
  subCategory: String,
  project: {
    type: mongoose.Schema.ObjectId,
    ref: "project",
  },
});

const Photo = mongoose.model("photo", PhotoSchema);

module.exports = Photo;
