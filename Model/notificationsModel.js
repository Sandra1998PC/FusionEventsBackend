const mongoose = require("mongoose")

const notificationsSchema = new mongoose.Schema({
    type: {
        type: String, required: true
    },
    userTitle:{
        type: String , required : true
    },
    orgTitle:{
        type: String , required : true
    },
    Message:{
        type: String , required : true
    },
    time:{
        type: Number , required : false
    },
    read:{
        type: Boolean , default : false
    },
    organizerId:{
        type: String , required : true
    },
    userId:{
        type: String , required : true
    }
})

const notifications = mongoose.model("notifications", notificationsSchema)
module.exports = notifications