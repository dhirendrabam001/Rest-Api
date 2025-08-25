const express = require("express");
require("dotenv").config();
const mongoose = require("./config/connection");
const getRouter = require("./routes/getRouter");
const {postRequest, loginRequest} = require("./Controllers/postController");
const contactRouter = require("./routes/contactRouter");
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(getRouter);

app.post("/api/user/register", postRequest);
app.post("/api/user/login", loginRequest);
app.use("/api/contact", contactRouter)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running port number:${PORT}`)
    
});