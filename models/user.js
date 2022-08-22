const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
}, { timestamps : true })

const user = mongoose.model("user", userSchema)

const userSessionSchema = new mongoose.Schema({
    id : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true
    },
    startTime : {
        type : Date,
        required : true
    },
    endTime : {
        type : Date,
        required : true
    },
    isExpired : {
        type : Boolean,
        default : false
    }
}, { timestamps : true })

const userSession = mongoose.model("userSession", userSessionSchema)

module.exports = {
    user,
    userSession
}