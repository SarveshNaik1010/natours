const handlerFactory = require('./handlerFactory');
const Photo = require('../model/photosModel');

exports.insertPhoto = handlerFactory.insertOne(Photo);
exports.getAllPhotos = handlerFactory.getAll(Photo);
exports.getPhoto = handlerFactory.getOne(Photo);