let express = require("express")
let { connectDB } = require("./config/database")
let { PORT } = require("./config")
let blogRoutes = require("./routers/blogs.router")
let userRoutes = require("./routers/users.router")

connectDB()

let app = express()

app.use(express.json())
app.use("/blogs", blogRoutes)
app.use("/users", userRoutes)

app.listen(PORT, (err) => {
    if(err){
        throw err
    }
    console.log("server running")
})