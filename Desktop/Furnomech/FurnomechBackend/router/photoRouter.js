const express = require("express");
const photoController = require("../controller/photoController");

const router = express.Router();

router
  .route("/")
  .get(photoController.getAllPhotos)
  .post(photoController.insertPhoto);
router.route("/:id").get(photoController.getPhoto);

module.exports = router;
