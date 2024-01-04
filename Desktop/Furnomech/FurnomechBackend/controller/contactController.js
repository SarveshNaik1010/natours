const handlerFactory = require('./handlerFactory');
const Contact = require('../model/contactModel');

exports.insertContactInfo = handlerFactory.insertOne(Contact);