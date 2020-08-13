const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    email:String,
    password:String,
    bio: {required: false, type:String, default : ''},
    image: {required: false, type:String,  default : ''},
})
module.exports = mongoose.model('user', userSchema)