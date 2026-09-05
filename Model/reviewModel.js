const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
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
    stars:{
        type: Number , required : true
    },
    review:{
        type: String , required : true
    }
})

const reviews = mongoose.model("reviews", reviewSchema)
module.exports = reviews