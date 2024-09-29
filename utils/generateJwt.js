let jwt = require("jsonwebtoken")

let generateToken = (id) => {
    return jwt.sign({id}, "secret-key", {
        expiresIn: "1d"
    })
}

module.exports = generateToken