const mongoose = require("mongoose")

const eventRegisterSchema = new mongoose.Schema({
    eventname: {
        type: String, required: true
    },
    eventId:{
        type: String , required : true
    },
    userId:{
        type: String , required : true
    },
    organizerId:{
        type: String , required : true
    },
    name:{
        type: String , required : true
    },
    email:{
        type: String , required : true
    },
    phone:{
        type: String , required : true
    },
    quantity:{
        type: Number , required : true
    }
})

const eventRegister = mongoose.model("eventRegister", eventRegisterSchema)
module.exports = eventRegister