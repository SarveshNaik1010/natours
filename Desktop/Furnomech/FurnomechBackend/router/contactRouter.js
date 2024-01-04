const express = require("express");
const contactController = require("../controller/contactController");
const viewController = require("../controller/viewController");

const router = express.Router();

router.route("/").post(contactController.insertContactInfo);

module.exports = router;
