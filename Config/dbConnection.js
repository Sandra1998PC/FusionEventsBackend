const mongoose = require("mongoose")
const DBconnectionString = process.env.mongoDBConnectionString

mongoose.connect(DBconnectionString).then(res => {
    console.log(`MongoDB Connected Successfully !!!!`);
    
}).catch(err => {
    console.log(`MongoDB Connection Failed !!!!`);
    console.log(err);
})