const express = require("express")
const app = express()
const connect = require("./Dbconfig/dbconnect")
require("dotenv").config()
const userrouter = require("./routes/user.route")
const cors = require("cors")

// middlewares
app.use(cors({origin:"*"}))
app.use(express.json())
app.use("/user", userrouter)



connect()
let port = 5003
app.listen(port,()=>{
   console.log(`app started on port ${port}`);
   
})
