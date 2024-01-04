const multer = require("multer");
const sharp = require("sharp");
const Project = require("../model/projectModel");
const handlerFactory = require("./handlerFactory");

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log(file);
//     cb(null, `public/data/projectImages`);
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `project-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
});

exports.uploadImages = upload.fields([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "photos",
    maxCount: 50,
  },
]);

exports.optimizeImages = async (req, res, next) => {
  console.log(req.body);
  req.files.imageCover[0].filename = `${
    req.body.clientName
  }-${Date.now()}.jpeg`;

  // 1. Cover image
  await sharp(req.files?.imageCover[0].buffer)
    .resize(2000, 2500)
    .toFormat("jpeg")
    .jpeg()
    .toFile(`public/data/projectImages/${req.files.imageCover[0].filename}`);

  // 2. Other images

  req.body.photos = [];
  await Promise.all(
    req.files.photos.map(async (imgFile, i) => {
      const fileName = `${req.body.projectName}-${Date.now()}.jpeg`;
      await sharp(imgFile.buffer)
        .toFormat("jpeg")
        .toFile(`public/data/projectImages/${fileName}`);
      req.body.photos.push(fileName);
    })
  );

  next();
};

exports.insertProject = handlerFactory.insertOne(Project);
exports.getAllProjects = handlerFactory.getAll(Project);
exports.getProject = handlerFactory.getOne(Project);
