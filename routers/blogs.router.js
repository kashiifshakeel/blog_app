let { Router } = require("express")
let { addBlog, fetchAllBlogs, fetchOneBlog, updateBlog, deleteBlog } = require("../controllers/blogs.controllers")

let router = Router()

router.post("/add", addBlog)
router.get("/findAll", fetchAllBlogs)
router.get("/findOne/:id", fetchOneBlog)
router.put("/updated/:id", updateBlog)
router.delete("/delete/:id", deleteBlog)

module.exports = router