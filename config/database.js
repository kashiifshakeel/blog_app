let mongoose = require("mongoose")
let { MONGODB_URL } = require(".")

let connectDB = async() => {
    await mongoose.connect(MONGODB_URL)
    console.log("database connected")
}

module.exports = {
    connectDB,
}