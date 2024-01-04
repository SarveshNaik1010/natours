const express = require("express");
const multer = require('multer');
const path = require("path");

const projectRouter = require("./router/projectRouter");
const photoRouter = require("./router/photoRouter");
const viewRouter = require("./router/viewRouter");
const contactRouter = require("./router/contactRouter");
const authRouter = require("./router/authRouter");
const categoryRouter = require('./router/categoryRouter');

const app = express();

app.set("view engine", "pug"); //No need to require
app.set("views", path.join(__dirname, "views"));

// 1.Global Middleware
// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// app.use(express.json());

// app.use(express.static(__dirname + "public"));

app.use(express.json({ limit: "10kb" }));

app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use("/api/v1/project", projectRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/photo", photoRouter);
app.use("/api/v1/contact", contactRouter);
app.use('/auth', authRouter);
app.use('/insert-category', categoryRouter);

app.use('/error', (req, res, next) => {
  res.status(404).render("error");
});

app.use("/", viewRouter);

app.use("*", (req, res, next) => {
  res.status(404).render("error");
});

module.exports = app;
