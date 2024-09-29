let { Router } = require("express")
let { addUser, fetchAllUsers, fetchOneUser, updateUser, deleteUser, loginUser } = require("../controllers/users.controllers")

let router = Router()

router.post("/addUser", addUser)
router.post("/login", loginUser)
router.get("/fetchAllUsers", fetchAllUsers)
router.get("/fetchOneUser/:id", fetchOneUser)
router.put("/updateUser/:id", updateUser)
router.delete("/deleteUser/:id", deleteUser)

module.exports = router