const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Customer must have a name"],
  },
  email: {
    type: String,
    require: [true, "Customer must have an email"],
  },
  phoneNumber: {
    type: String,
    require: [true, "Customer must have a phone number"],
  },
  recepientsAddress: String,
  message: String,
});

const Contact = mongoose.model("contact", PhotoSchema);

module.exports = Contact;
