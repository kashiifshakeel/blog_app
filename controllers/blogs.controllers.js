let blogSchema = require("../models/blogs.models")

let addBlog = async(req, res) => {
    try{
        let payload = req.body
        let newBlog = await blogSchema.create(payload)
        res.status(201).json({
            success: true,
            message: "blog added",
            data: newBlog,
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
            customMessage: "error while handing the blog"
        })
    }
}

let fetchAllBlogs = async(req, res) => {
    try{
        let allBlogs = await blogSchema.find().populate("user")
        if(allBlogs.length===0){
            return res.status(200).json({
                success: true,
                message: "no blog found",
            })
        }
        res.status(200).json({
            success: true,
            message: "all blogs data fetched",
            data: allBlogs,
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message: err.message,
            customMessage: "error while fetching all blogs"
        })
    }
}

let fetchOneBlog = async(req, res) => {
    try{
        let id = req.params.id
        let findBlog = await blogSchema.findOne({_id: id}).populate("user")
        if(!findBlog){
            return res.status(200).json({
                success: true,
                message: "no blog found",
            })
        }
        res.status(200).json({
            success: true,
            message: "blogs details fetched",
            data: findBlog,
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message: err.message,
            customMessage: "error while fetching the details of the blog"
        })
    }
}

let updateBlog = async(req, res) => {
    try{
        let id = req.params.id
        let updateBlog = await blogSchema.updateOne({_id: id}, {
            $set: {
                title: req.body.title,
                body: req.body.body,
            },
        })
        res.status(200).json({
            success: true,
            customMessage: "blog updated successfully",
            data: updateBlog,
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
            customMessage: "updation process failed"
        })
    }
}

let deleteBlog = async(req, res) => {
    try{
        let id = req.params.id
        let findBlog = await blogSchema.findOne({_id: id})
        if(!findBlog){
            return res.status(200).json({
                success: false,
                message: "no blog found",
            })
        }
        let deleteBlog = await blogSchema.deleteOne({_id: id})
        res.status(200).json({
            success: true,
            customMessage: "deletion done",
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
            customMessage: "deletion failed"
        })
    }
}

module.exports = {
    addBlog,
    fetchAllBlogs,
    fetchOneBlog,
    updateBlog,
    deleteBlog,
}