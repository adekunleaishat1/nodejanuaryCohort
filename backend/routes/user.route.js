const express = require('express');
const userrouter = express.Router()
const {Registeruser, Loginuser, VerifyToken, UploadProfile, productUpload} = require("../controllers/user.controller")

userrouter.post("/signup", Registeruser)
userrouter.post("/login", Loginuser)
userrouter.get("/verify", VerifyToken)
userrouter.post("/upload", UploadProfile)
userrouter.post("/uploaddd", productUpload)


module.exports = userrouter