const usermodel = require("../Model/User.model")



const Getsignup = (req, res) =>{
    res.render("signup")
}


  const UserSignup = async (req, res) =>{
    try {
        console.log(req.body);
        const user =  await usermodel.create(req.body)
        if (user) {
          console.log("A user created successfully"); 
          res.redirect("/login")
        }else{
         res.redirect("/signup")
        }
      } catch (error) {
        console.log(error);
        
      }
  }


  module.exports = {UserSignup,Getsignup}