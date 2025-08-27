const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("./config/connection");
const getRouter = require("./routes/getRouter");
const { postRequest, loginRequest } = require("./Controllers/postController");
const { contactRequest, getContact, findContctIdByUser, findContactId, updateContactById, deleteDataById } = require("./Controllers/contactController");
const authMiddleware = require("./middleware/authMiddleware");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(getRouter);

app.post("/api/user/register", postRequest);
app.post("/api/user/login", loginRequest);
app.post("/api/user/contact",authMiddleware, contactRequest);
app.get("/api/user/get", getContact);
app.get("/api/user/getuser/:id", findContctIdByUser);
app.get("/api/user/:id", findContactId);
app.put("/api/user/update/:id", authMiddleware, updateContactById);
app.delete("/api/user/delete/:id", authMiddleware, deleteDataById);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running port number:${PORT}`)

});