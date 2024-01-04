const { default: axios } = require("axios");
const Project = require("../model/projectModel");
const Client = require("../model/clientModel");


const projects = [
  {
    projectName: "Bedside Table",
    projectCategory: "bedroom",
  },
  {
    projectName: "Sofa",
    projectCategory: "living room",
  },
  {
    projectName: "Kitchen Mixer",
    projectCategory: "kitchen",
  },
  {
    projectName: "Desk",
    projectCategory: "office",
  },
  {
    projectName: "Dresser",
    projectCategory: "bedroom",
  },
  {
    projectName: "Coffee Table",
    projectCategory: "living room",
  },
  {
    projectName: "Toaster",
    projectCategory: "kitchen",
  },
  {
    projectName: "Office Chair",
    projectCategory: "office",
  },
  {
    projectName: "Wardrobe",
    projectCategory: "bedroom",
  },
  {
    projectName: "TV Stand",
    projectCategory: "living room",
  },
];

const del = async function () {
  await Project.deleteOne();
  console.log('deleted');
};

const ins = async function () {
  const d = await Project.insertMany(projects);
  console.log(d);
};

del();

// (async function () {
//   try {
//     const a = await axios({
//       method: "GET",
//       url: "http://127.0.0.1:8000/api/v1/projects/bedroom",
//     });

//     console.log(a);
//   } catch (error) {
//     console.log(error);
//   }
// })();
