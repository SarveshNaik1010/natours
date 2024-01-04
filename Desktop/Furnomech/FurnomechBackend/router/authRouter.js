const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();

router.route('/').get(authController.getAdmin);

module.exports = router;