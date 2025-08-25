const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;
console.log("MongoseUrl", MONGO_URL);
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Database Connection Sucussfully");  
})
.catch((error) => {
    console.log("No Database Connection", error);
    
});