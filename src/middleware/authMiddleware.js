const jwt = require("jsonwebtoken");
const {newUser} = require("../Models/user");
const isAuthenticated = async (req,res,next) => {
    const givenToken = req.header("Authorized");

    if(!givenToken) {
        return res.status(400).json({success: false, message: "Token does not found"});
    }

    const decoded = jwt.verify(givenToken, process.env.JWT_KEY);
    const id = decoded.userId;
    
    const user = await newUser.findById(id);
    if(!user) {
        return res.status(400).json({success: false, message: "User is not found"});
    }
    req.user = user;
    next();
    
    
    
}

module.exports = isAuthenticated;