const {contactModel} = require("../Models/contact");

const contactRequest = async (req,res) => {
    try {
        const {name, email, phone, type} = req.body;
        console.log("body data:", req.body);
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
        return res.status(200).json({success: true, message: "Data Has Been Store Database Succssfully"});
        
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server issue"});
    }

}


module.exports = contactRequest;