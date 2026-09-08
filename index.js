require("dotenv").config()
const cors = require("cors")
const express = require("express")
const routes = require("./Routes/allRoutes")

const fusionEventsServer = express()
require('./Config/dbConnection')

fusionEventsServer.use(cors())
fusionEventsServer.use(express.json())
fusionEventsServer.use(routes)
fusionEventsServer.use("/uploads",express.static("./uploads"))

const PORT = process.env.PORT || 3000;

fusionEventsServer.listen(PORT, () => {
    console.log(`Server Started running in PORT : ${PORT}`)
})

fusionEventsServer.get("/", (req,res) => {
    res.status(200).send("<h1> Fusion Events Server</h1>")
})

fusionEventsServer.use((err, req, res, next)=>{
    res.status(500).json(err.message)
})