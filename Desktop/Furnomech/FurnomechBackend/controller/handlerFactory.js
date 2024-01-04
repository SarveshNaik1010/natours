const Project = require("../model/projectModel");

exports.getAll = (Model) => {
  return async function (req, res, next) {
    try {
      const data = await Model.find();

      const projects = data.map(
        (d, i) => d
        // d.populate({ path: "project", strictPopulate: false })
      );
      res.status(200).json({
        status: "success",
        results: data.length,
        projects,
      });
    } catch (error) {
      res.status(404).json({
        error,
      });
    }
  };
};

exports.getOne = (Model) => {
  return async function (req, res, next) {
    try {
      console.log(req.params);
      const data = await Model.find({ slug: req.params.slug });
      console.log(data);
      res.status(200).json({
        status: "success",
        data,
      });
    } catch (error) {
      res.status(404).json({
        error,
      });
    }
  };
};

exports.insertOne = (Model) => {
  return async function (req, res, next) {
    try {
      // 1. Get the file details & add images to req.body.
      if (req.files) {
        req.body.imageCover = req.files.imageCover.map(
          (img, i) => img.filename
        )[0];
      }
      // req.body.photos = req.files.photos.map((img, i) => img.filename);
      console.log(req.body);
      const data = await Model.create(req.body);
      res.status(200).json({
        status: "success",
        message: "Data uploaded successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        status: "fail",
        message: error.message,
      });
    }
  };
};

exports.insert = (Model) => {
  return async function (req, res, next) {
    try {
      console.log(req.body);
      const data = await Model.insertMany(req.body);
      res.status(200).json({
        status: "success",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        status: "fail",
        message: error.message,
      });
    }
  };
};

exports.updateOne = (Model) => {
  return async function (req, res, next) {
    try {
      const updatedData = await Model.findByIdAndUpdate(
        req.params.id,
        req.body
      );

      res.status(200).json({
        status: "success",
        updatedData,
      });
    } catch (error) {
      res.status(error.statusCode).json({
        error,
      });
    }
  };
};

exports.deleteOne = (Model) => {
  return async (req, res, next) => {
    try {
      await Model.deleteOne();

      res.status(204).json({
        status: "success",
      });
    } catch (error) {
      res.status(400).json({
        error,
      });
    }
  };
};
