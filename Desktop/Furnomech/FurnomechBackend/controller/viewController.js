const Admin = require("../model/adminModel");

exports.displayHome = (req, res, next) => {
  res.status(200).render("home", {
    title: "Home",
  });
};

exports.displayAboutUs = (req, res, next) => {
  res.status(200).render("aboutUs", {
    title: "About us",
  });
};

exports.displayContactUs = (req, res, next) => {
  res.status(200).render("contactUs", {
    title: "Contact us",
  });
};

exports.displayProjects = (req, res, next) => {
  res.status(200).render("projects", {
    title: "Projects",
  });
};

exports.displayOneProject = (req, res, next) => {
  res.status(200).render("individualProject", {
    title: "Project",
  });
};

exports.displayCategories = (req, res, next) => {
  res.status(200).render("categories", {
    title: "Categories",
  });
};

exports.authProject = (req, res, next) => {
  res.status(200).render("insertProject", {});
};

exports.authCategory = (req, res, next) => {
  res.status(200).render("insertCategory", {});
};
