const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    adminName: String,
    adminPassword: String
});

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;
