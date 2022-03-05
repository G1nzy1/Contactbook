const express = require("express");
const setupContactRoutes = require("./app/routes/contact.routes");
const {BadRequestError, errorHandler } = require("./app/errors");
const cors = require("cors");
const app = express();
setupContactRoutes(app);
app.get("/", (req, res) =>{
    res.json({ message: "Welcome to contact book application."});
});
app.use((req, res, next) => {
    next(new BadRequestError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
    errorHandler.handleError(err, res);
});
app.use(cors());
app.use(express.json());
module.exports = app;