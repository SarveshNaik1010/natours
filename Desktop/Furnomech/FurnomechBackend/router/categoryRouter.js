const express = require("express");
const categoryController = require("../controller/categoryController");

const router = express.Router();

router.route("/:imgType").get(categoryController.getImageByCategory);
router.route("/").get(categoryController.getAllCategories);
router
  .route("/")
  .post(
    categoryController.uploadImages,
    categoryController.optimizeImages,
    categoryController.insertImage
  );

module.exports = router;
