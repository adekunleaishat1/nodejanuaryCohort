const express = require('express');
const userrouter = express.Router()
const {Registeruser, Loginuser, VerifyToken} = require("../controllers/user.controller")

userrouter.post("/signup", Registeruser)
userrouter.post("/login", Loginuser)
userrouter.get("/verify", VerifyToken)


module.exports = userrouter