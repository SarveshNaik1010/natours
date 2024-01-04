const express = require("express");
const projectController = require("../controller/projectController");
const viewController = require("../controller/viewController");

const router = express.Router();

router
  .route("/")
  .get(projectController.getAllProjects)
  .post(
    projectController.uploadImages,
    projectController.optimizeImages,
    projectController.insertProject
  );

router.route("/:slug").get(projectController.getProject);

module.exports = router;
