const express = require("express");
const getRouter = express.Router();

getRouter.get("/", (req,res) => {
    res.send("Hello dhirendra")
});


module.exports = getRouter;