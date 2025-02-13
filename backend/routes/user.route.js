const express = require('express');
const userrouter = express.Router()
const validator = require("../Middlewares/validator")
const uservalidation = require('../Middlewares/userValidation')
const {Registeruser, Loginuser, VerifyToken, UploadProfile, productUpload} = require("../controllers/user.controller")

userrouter.post("/signup",validator(uservalidation) ,Registeruser)
userrouter.post("/login", Loginuser)
userrouter.get("/verify", VerifyToken)
userrouter.post("/upload", UploadProfile)
userrouter.post("/uploaddd", productUpload)


module.exports = userrouter