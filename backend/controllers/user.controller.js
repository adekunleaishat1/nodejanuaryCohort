const usermodel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cloudinary = require("../Utils/cloudinary")
const Verifytoken = require("../session/sessionservice")
const productmodel = require("../models/product.model")

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
    const email = await Verifytoken(token)
    console.log(email);
    if (email) {
      const user =   await usermodel.findOne({email:email})
      if (user) {
        return res.status(200).send({message:"User verified", status:true,user})
      }
    }else{
      res.status(400).send({message:"Invalid token", status:false})
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message:error.message, status:false})
  }
}


const UploadProfile = async (req, res) =>{
   try {
    const {image } = req.body
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);
    const verifyuser = await jwt.verify(token, secretkey)
    if (!verifyuser) {
      res.status(400).send({message:"Invalid user",status:false })
    }else{
      const imageupload =  await cloudinary.uploader.upload(image)
      console.log(imageupload.secure_url);
    const updatedprofile =  await  usermodel.findOneAndUpdate(
        {email:verifyuser.email},
        {$set:{profilepicture:imageupload.secure_url}},
        {new:true}
      )

      if (updatedprofile) {
        res.status(200).send({message:"profile updated successfuly", status:true})
      }
  
      
    }
    
   } catch (error) {
     res.status(500).send({message:error.message, status:false})
   }
}

const productUpload = async (req, res) => {
try {
  const {productname, productprice, productimage} = req.body

const images = await Promise.all(productimage.map(async (image) => {
  const cloudimages = await cloudinary.uploader.upload(image)
return cloudimages.secure_url
})) 

const createdproduct = await productmodel.create({
  Productname:productname,
  Productprice:productprice,
  Productimage:images
})

console.log(createdproduct);


} catch (error) {
  
}
}

module.exports = {Registeruser, Loginuser, VerifyToken, UploadProfile, productUpload}