let { Schema, model } = require("mongoose")
let bcrypt = require("bcrypt")

let userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    date: {
        type: Date,
        default: Date.now,
    },
},
    { timestamps: true },
)

// pre-hooks
// used for password hashing
userSchema.pre("save", async function(){
    let salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
})

// function to compare password which helps in logging in
// this userSchema is not our database collection but a method used for comparing password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = model("User", userSchema)