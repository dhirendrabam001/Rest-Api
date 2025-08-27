const { default: mongoose } = require("mongoose");
const {contactModel} = require("../Models/contact");

const contactRequest = async (req,res) => {
    try {
        const {name, email, phone, type} = req.body;
        if(!name || !email || !phone || !type) {
            return res.status(400).json({success: false, message: "Please field the neccessary requirements"});
        }

        // save database
        const saveContact = await contactModel.create({
            name,
            email,
            phone,
            type
        });
        return res.status(200).json({success: true, message: "Data Has Been Store Database Succssfully", data: saveContact});
        
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server issue"});
    }

}

// Get all data information
const getContact = async (req,res) => {
    const userContact = await contactModel.find();
    if(!userContact) {
        return res.status(400).json({success: false, message: "No Contact data has been find"});
    }
    res.status(200).json({success: true, message: "All Contact has been fetched", user: userContact});
}

// Get data and information by id
const findContactId = async (req,res) => {
    const id = req.params.id;
    const findId = await contactModel.findById(id);
    if(!findId) {
        return res.status(400).json({success: false, message: "Id does not found"});
    }
    res.status(200).json({success: true, message: "Id is matched", id: findId});
    
};

//Update contact by id;
const updateContactById = async (req,res) => {
    const id = req.params.id;
    const {username, email, phone, type} = req.body;
    const updatedata = await contactModel.findByIdAndUpdate(id, {
        username,
        email,
        phone,
        type
    }, {new: true})

    if(!updatedata) {
        return res.status(400).json({success: false, message: "Invalid updated data"});
    }
    res.status(200).json({success: true, message: "Data has been updated successfully", data: updatedata});

};

const deleteDataById = async (req,res) => {
    const id = req.params.id;
    const deleteData = await contactModel.findByIdAndDelete(id);
    if(!deleteData) {
        return res.status(400).json({success: false, message: "Id does not found delete data"});
    }
    res.status(200).json({success: true, message: "Data Has Been Deleted Successfully"});
}

module.exports = {contactRequest, getContact, findContactId, updateContactById, deleteDataById};