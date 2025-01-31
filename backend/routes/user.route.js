const express = require('express');
const userrouter = express.Router()
const {Registeruser, Loginuser} = require("../controllers/user.controller")

userrouter.post("/signup", Registeruser)
userrouter.post("/login", Loginuser)


module.exports = userrouter