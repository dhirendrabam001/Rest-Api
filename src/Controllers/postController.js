const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { newUser } = require("../Models/user");
const jwt = require("jsonwebtoken");
const postRequest = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        
        if(!username || !email || !password) {
            return res.status(400).send({success: false, message: "Please required fields"})
        }
         const checkEmail = await newUser.findOne({email});

        if(checkEmail) {
           return res.status(400).send({success: false, message: "Email Already Exits"});
        }

        const userData = await newUser.create({
            username,
            email,
            password: hashPassword
        });
       return res.status(200).send({success: true, message: "Data has been store database", data: userData});

       
        
        
    } catch (error) {
        res.status(500).send({success: false, "Some Internal Issue": error})
    }
}


const loginRequest = async (req,res) => {
    try {
        const {email, password} = req.body;
        
        // All field are requried
        if(!email || !password) {
            return res.status(400).json({success: false, message: "Please all field are required"});
        }

        // find email exits database or not
        const user = await newUser.findOne({email});
        if(!user) {
            return res.status(400).json({success: false, message: "Email address does not exits database"});
        }

        // compare password
        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword) return res.status(400).json({success: false, message: "Password does not matched"});

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_KEY,
            {expiresIn: "45m"}
        );



        res.json({success: true, message: `Welcome ${user.username}`, token});
        
        
        
        
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Server Issue", error});
        
    }
}



module.exports = {postRequest, loginRequest};