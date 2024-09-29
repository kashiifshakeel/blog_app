let userSchema = require("../models/users.models")
let generateToken = require("../utils/generateJwt")

let addUser = async(req, res) => {
    try{
        let email = req.body.email
        let existingUser = await userSchema.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "email already found",
            })
        }
        let newUser = await userSchema.create(req.body)
        let findUser = await userSchema.findOne({_id: newUser._id}).select("-password")
        res.status(200).json({
            success: true,
            message: "new user account created",
            data: newUser,
        })
    }
    catch(err){
        res.status(200).json({
            success: false,
            message: "user not added",
            error: err.message,
        })
    }
}

let loginUser = async(req, res) => {
    try{
        let { email, password } = req.body
        let findUser = await userSchema.findOne({email})
        if(!findUser){
            res.status(200).json({
                success: false,
                message: "user not found"
            })
        }
        let isMatched = await findUser.comparePassword(password)
        if(!isMatched){
            res.status(401).json({
                success: false,
                message: "wrong password",
            })
        }
        let token = generateToken(findUser._id)
        res.status(200).json({
            success: true,
            message: "user logged in",
            tokenGenerated: token,
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "error in loginUser block",
            error: err.message,
        })
    }
}

let fetchAllUsers = async(req, res) => {
    try{
        let allUsers = await userSchema.find({})
        if(allUsers.length===0){
            res.status(200).json({
                success: true,
                message: "no user found"
            })
        }
        res.status(200).json({
            success: true,
            message: "users fetched succesfully",
            numberOfUsers: allUsers.length,
            data: allUsers
        })
    }
    catch(err){
        res.status(200).json({
            success: false,
            message: "users not fetched",
            error: err.message,
        })
    }
}

let fetchOneUser = async(req, res) => {
    try{
        let findUser = await userSchema.findOne({_id: req.params.id})
        if(!findUser){
            res.status(200).json({
                success: true,
                message: "no user is exisiting",
            })
        }
        res.status(200).json({
            success: true,
            message: "user data found",
            data: findUser
        })
    }
    catch{
        res.status(200).json({
            success: false,
            message: "single user data not fetched",
            error: err.message,
        })
    }
}

let updateUser = async(req, res) => {
    try{
        let findUser = await userSchema.findOne({_id: req.params.id})
        if(!findUser){
            res.status(200).json({
                success: true,
                message: "user not found",
            })
        }
        // let updateUser = await userSchema.updateOne(
        //     {
        //         _id: req.params.id,
        //     },
        //     {
        //         $set: {
        //             name: req.body.name,
        //             email: req.body.email,
        //             password: req.body.password,
        //         },
        //     }
        // )
        findUser.name = req.body.name || findUser.name
        findUser.email = req.body.email || findUser.email
        findUser.password = req.body.password || findUser.password
        await findUser.save()
        res.status(200).json({
            success: true,
            message: "user data updated",
            data: updateUser,
        })
    }
    catch(err){
        res.status(200).json({
            success: false,
            message: "some error occured in update user block",
            error: err.message,
        })
    }
}

let deleteUser = async(req, res) => {
    try{
        let findUser = await userSchema.findOne({_id: req.params.id})
        if(!findUser){
            res.status(200).json({
                success: true,
                message: "user not found",
            })
        }
        await userSchema.deleteOne({_id: req.params.id})
        res.status(200).json({
            success: true,
            message: "user data deleted",
        })
    }
    catch(err){
        res.status(200).json({
            success: false,
            message: "some error occured in delete user block",
            error: err.message,
        })
    }
}

module.exports = {
    addUser,
    loginUser,
    fetchAllUsers,
    fetchOneUser,
    updateUser,
    deleteUser,
}