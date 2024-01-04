const Admin = require("../model/adminModel");

exports.getAdmin = async (req, res, next) => {
  const data = await Admin.find();
  res.status(200).json({
    status: "success",
    data,
  });
};
