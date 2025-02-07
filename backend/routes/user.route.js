const express = require('express');
const userrouter = express.Router()
const {Registeruser, Loginuser, VerifyToken, UploadProfile} = require("../controllers/user.controller")

userrouter.post("/signup", Registeruser)
userrouter.post("/login", Loginuser)
userrouter.get("/verify", VerifyToken)
userrouter.post("/upload", UploadProfile)


module.exports = userrouter