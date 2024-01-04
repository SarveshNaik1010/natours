const express = require("express");
const viewController = require("../controller/viewController");

const router = express.Router();

router.route("/").get(viewController.displayHome);
router.route("/about-us").get(viewController.displayAboutUs);
router.route("/contact-us").get(viewController.displayContactUs);
router.route("/projects").get(viewController.displayProjects);
router.route("/categories").get(viewController.displayCategories);
router.route("/:projectName").get(viewController.displayOneProject);
router.route("/categories").get(viewController.displayCategories);
router.route("/furnomech/insert/project").get(viewController.authProject);
router.route("/furnomech/insert/category").get(viewController.authCategory);

module.exports = router;
