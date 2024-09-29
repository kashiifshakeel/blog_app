let { Schema, model, Types } = require("mongoose")

let blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: Types.ObjectId,
        ref: "User"
    },
},
    { timestamps: true },
)

module.exports = model("Blog", blogSchema)