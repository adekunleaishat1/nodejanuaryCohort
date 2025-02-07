const jwt = require("jsonwebtoken")
let secretkey = "jwtsecret"

const Verifytoken = async(token)=>{
 try {
    if (!token) {
        throw new Error ("Token is not provided")
    }
    else{
        const decoded = await jwt.verify(token, secretkey)
        return decoded.email
    }
 } catch (error) {
    if (error.name == "TokenExpiredError") {
        throw new Error("jwt expired")
    }else{
        throw new Error("error verifying token")
    }

 }
} 

module.exports = Verifytoken;

