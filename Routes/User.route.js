const express = require("express")
const userrouter = express.Router()
const {UserSignup, Getsignup} = require("../Controllers/User.controller")

userrouter.get("/signup", Getsignup)
userrouter.post("/user/signup", UserSignup)



module.exports = userrouter