const mongoose = require("mongoose")

const connect = async () =>{
  try {
   const connected = await mongoose.connect(process.env.MONGO_URI)
   if (connected) {
    console.log("database connected successfully");
    
   }
  } catch (error) {
    console.log(error);
    
  }
}


module.exports = connect

