const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    eventname: {
        type: String, required: true
    },
    category: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    venue: {
        type: String, required: true
    },
    date: {
        type: String, required: true
    },
    time: {
        type: String, required: true
    },
    price: {
        type: Number, default: 0
    },
    seats: {
        type: Number, default: 0
    },
    bannerImage: {
        type: String, default: ""
    },
    galleryImage: {
        type: String, default: ""
    },
    participants: {
        type: Number, default: 0
    },
    status:{
        type:String,default: "Pending"
    },
    organizername:{
        type: String , required : true
    },
    organization:{
        type: String , required : true
    },
    organizerId:{
        type: String , required : true
    },
    ticketsSold:{
       type: Number, default: 0 
    }
})

const events = mongoose.model("events", eventSchema)
module.exports = events