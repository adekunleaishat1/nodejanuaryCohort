const express = require("express")
const app = express()
 const ejs =  require("ejs")

// middlewares
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))

let userarray = []
let todoarray = []
let message;
app.get("/",(request, response)=>{
//   response.send("Welcome to your Node class")
// console.log(__dirname);
// response.sendFile(__dirname + "/index.html")

response.render("index")
})

app.get("/signup",(req, res)=>{
  res.render("signup")
})

app.get("/user", (req, res)=>{
    res.json([
        {name:"tola", age:20},
        {name:"bola", age:23},
        {name:"promise", age:26}
    ])
})

app.get("/login",(req,res)=>{
  res.render("login")
})

app.get("/todo",(req, res)=>{
  res.render("todo",{name:"Tola",todoarray})
})


app.post("/todo",(req, res)=>{
   console.log(req.body);
   const {title, content} = req.body
   if (!title || !content) {
       message = "Input fields are mandatory"
       res.redirect("/todo")
   }else{
       todoarray.push(req.body)
       res.redirect("/todo")
   }
})


app.post("/todo/delete/:index",(req, res)=>{
  console.log(req.params);
  const {index} = req.params
  todoarray.splice(index,1)
  res.redirect("/todo")
})

app.post("/user/signup",(req, res)=>{
   console.log(req.body);
  userarray.push(req.body)
   console.log(userarray);
   res.redirect("/login")
   
})

app.post("/user/login",(req,res)=>{
  console.log(req.body);
  const {email, password } = req.body
 const existuser =  userarray.find((user)=> user.email === email && user.password === password)
 console.log(existuser);
 if (existuser) {
  console.log("login successful");
  res.redirect("/")
 }else{
  console.log("login failed");
  res.redirect("/login")
 }
})

const port = 5000
app.listen(port,()=>{
  console.log(`App started on port ${port}`);
  
})