const {successResponse , failResponse, errorResponse} = require("../helpers/response")
const userModel = require("../models/user")

const getUserProfile = async (req, res) => {
    try{
        let {userId} = req.user
        const data = await userModel.user.findOne({userId})
        const { name, phone, email, createdAt } = data
        const result = {
            userId, name, phone, email, createdAt
        }
        return successResponse(req, res, result)
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

const updateUserDetails = async (req, res) => {
    try{
        let {userId} = req.user
        delete req.body.password
        const data = await userModel.user.updateOne({userId}, {
            $set : {
                ...req.body
            }
        })
       
        return successResponse(req, res, "success")
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

const logout = async (req, res) => {
    try{
       const id = req.session.id
       await userModel.userSession.updateOne({id},{
        $set : {
            isExpired : true
        }
       })
       return successResponse(req, res, "success")
    } catch (error){
        console.log(error)
        return errorResponse(req, res, error)
    }
}

module.exports = {
    getUserProfile,
    updateUserDetails,
    logout
}
