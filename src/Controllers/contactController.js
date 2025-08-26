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

const getContact = async (req,res) => {
    const userContact = await contactModel.find();
    if(!userContact) {
        return res.status(400).json({success: false, message: "No Contact data has been find"});
    }
    res.status(200).json({success: true, message: "All Contact has been fetched", user: userContact});
}

const findContactId = async (req,res) => {
    const id = req.params.id;
    const findId = await contactModel.findById(id);
    console.log(findId);
    if(!findId) {
        return res.status(400).json({success: false, message: "Id does not found"});
    }
    res.status(200).json({success: true, message: "Id is matched", id: findId});
    
    
    
};

module.exports = {contactRequest, getContact, findContactId};