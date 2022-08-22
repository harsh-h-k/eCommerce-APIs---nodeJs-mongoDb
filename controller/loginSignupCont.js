const {successResponse , failResponse, errorResponse} = require('..//helpers/response')
const { v4: uuidv4 } = require('uuid')
const userModel = require("../models/user")
const userFuncs = require("../functions/loginSignupFuncs")
var validator = require('validator')
const crypto = require('crypto')
const tokenFunc = require("../helpers/token")

const registerUser = async (req, res) => {
    try{
        const {name, email, phone, password} = req.body

        // Check If all params are received or not
        if(!name || !email || !phone || !password){
            return failResponse(req, res, "Enter name, email , phone and password")
        }

        // Validate email, password length and user already registered or not 
        const validateEmail = validator.isEmail(email)
        if(!validateEmail){
            return failResponse(req, res, "Entered email is inValid")
        }
        if(password.length < 6){
            return failResponse(req, res, "minimum password length required : 6 characters")
        }
        const checkEmail = await userFuncs.ifEmailAlreadyRegistered(email)
        if(checkEmail){
            return failResponse(req, res, "email already registered, kindly login.")
        }

        // Insert record of new user 
        
       const user = new userModel.user({
        userId : uuidv4(),
        password : crypto.createHash("md5").update(password).digest("hex"),
        name,
        email,
        phone
       })
       const data = await user.save()

    //    return success result 
        return successResponse(req, res, "successfully registered" )
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

const login = async (req, res) => {
    try{
       let {email, password} = req.body

       if(!email || !password){
        return failResponse(req, res, "Enter email and password")
       }

    //    Check if user registered or not 
       const checkEmail = await userFuncs.ifEmailAlreadyRegistered(email)
        if(!checkEmail){
            return failResponse(req, res, "No Account associated with this email found. kindly register")
        }

        // Get details with that email 
        const userData = await userModel.user.find({email : email})

        // match password 
        password = crypto.createHash("md5").update(password).digest("hex")
        if(password !== userData[0].password){
            return failResponse(req, res, "password incorrect")
        }

        // create session with expiry of 7 days 
        const currentDate = new Date()
        const tokenExpiryDate = currentDate.setDate(currentDate.getDate() + 6)
        const userSession = new userModel.userSession({
            id : uuidv4(),
             userId : userData[0].userId,
             startTime : new Date(),
             endTime : tokenExpiryDate
        })
        const userSessionData = await userSession.save()

        // Generate token 
        const token = await tokenFunc.generateToken(userData[0], userSessionData)
        
        return successResponse(req, res, {
            userId : userData[0].userId,
            name : userData[0].name,
            token
        })
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}


module.exports = {
    registerUser,
    login
}