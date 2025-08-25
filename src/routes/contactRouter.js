const express = require("express");
const Router = express.Router();
const contactRequest = require("../Controllers/contactController");

Router.post("/new", contactRequest)



module.exports = Router;