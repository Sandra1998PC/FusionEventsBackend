const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    phonenumber: {
        type: Number, required: true
    },
    password: {
        type: String, required: true
    },
    role: {
        type: String, required: true
    },
    organization: {
        type: String, default: ""
    },
    location: {
        type: String, default: ""
    },
    website: {
        type: String, default: ""
    },
    bio: {
        type: String, default: ""
    },
    status: {
        type: String, default: "Pending"
    },
    profileImage: {
        type: String, default: ""
    }
})

const users = mongoose.model("users", userSchema)
module.exports = users