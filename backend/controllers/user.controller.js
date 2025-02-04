const usermodel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Registeruser = async(req, res) =>{
    try {
        console.log(req.body);
        const {username, email, password} = req.body
        if (!username || !email || !password) {
            res.status(400).send({message:"All fields are mandatory", status:false}) 
        }else{
        const hashedpassword =  await bcrypt.hash(password, 10)
        console.log(hashedpassword);
          const createduser = await usermodel.create({
            username,
            email,
            password:hashedpassword
          })
          if (createduser) {
            res.status(200).send({message:"Signup successful", status:true})
          }
        }
        
    } catch (error) {
        console.log(error);
        if (error.message.includes("E11000 duplicate key")) {
           return  res.status(402).send({message:"User already exist", status:false})
        }
          return  res.status(500).send({message:error.message, status:false})
    }
}

let secretkey = "jwtsecret"
const Loginuser = async(req, res) =>{
   try {
    const {email, password} = req.body
    const user = await usermodel.findOne({email})
     if (user) {
      const comparepasword = await bcrypt.compare(password, user.password)
      console.log(comparepasword);
      if (comparepasword) {
      const token = await  jwt.sign({email},secretkey,{expiresIn:"1d"})
      console.log(token);
       return res.status(200).send({message:"Login successful", status:true, token})
      }
     }else{
      res.status(401).send({message:"Invalid credentials", status:false})
     }
   } catch (error) {
     res.status(500).send({message:error.message, status:false})
   }
}

const VerifyToken = async (req, res) =>{
  try {
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);
    const verifyuser = await jwt.verify(token, secretkey)
    console.log(verifyuser);
    if (verifyuser) {
      const user =   await usermodel.findOne({email:verifyuser.email})
      if (user) {
        return res.status(200).send({message:"User verified", status:true,user})
      }
    }else{
      res.status(400).send({message:"Invalid token", status:false})
    }
  } catch (error) {
    res.status(500).send({message:error.message, status:false})
  }
}


module.exports = {Registeruser, Loginuser, VerifyToken}