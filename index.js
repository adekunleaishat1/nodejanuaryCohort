const express = require("express")
const app = express()
 const ejs =  require("ejs")
 const mongoose = require("mongoose")
 require("dotenv").config()
 const connect = require("./Dbconfig/Db.Connect")
 const userrouter = require("./Routes/User.route")

// middlewares
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))
app.use('/', userrouter)



const todoschema = mongoose.Schema({
  title:{type:String,trim:true, required:true},
  content:{type:String, trim:true, required:true}
})

const todomodel = mongoose.model("todo_collection", todoschema)

let userarray = []

let message;
app.get("/",(request, response)=>{
//   response.send("Welcome to your Node class")
// console.log(__dirname);
// response.sendFile(__dirname + "/index.html")

response.render("index")
})



app.get("/user", (req, res)=>{
    res.json([
        {name:"tola", age:20},
        {name:"bola", age:23},
        {name:"promise", age:26}
    ])
})

app.get("/login",(req,res)=>{
  res.render("login",{message})
})

app.get("/todo",async(req, res)=>{
 const todoarray = await todomodel.find()
 console.log(todoarray);
 
  res.render("todo",{name:"Tola",todoarray})
})


app.post("/todo", async(req, res)=>{
   console.log(req.body);
   const {title, content} = req.body
   if (!title || !content) {
       message = "Input fields are mandatory"
       res.redirect("/todo")
   }else{
      //  todoarray.push(req.body)
    const todo =  await todomodel.create(req.body)
    if (todo) {

      res.redirect("/todo")
    }
   }
})


app.post("/todo/delete/:id", async(req, res)=>{
  console.log(req.params);
  const {id} = req.params
 const deleteTodo =  await todomodel.deleteOne({_id:id})
   console.log(deleteTodo);
   
 if (deleteTodo.acknowledged == true) {
   console.log("todo deleted successfully");
   res.redirect("/todo")
 }else{
  console.log("todo not deleted");
  res.redirect("/todo")
 }
  
})





app.post("/user/login",async(req,res)=>{
  try {
    console.log(req.body);
    const {email, password } = req.body
   const existuser = await usermodel.findOne({email})
   console.log(existuser);
   if (existuser && existuser.password === password) {
    console.log("Login successful");
    message = "Login succesful"
    res.redirect("/")
   }else{
     message = "Invalid user"
      res.redirect("/login")
   }
   
  } catch (error) {
    console.log(error);
    
  }

//  const existuser =  userarray.find((user)=> user.email === email && user.password === password)
//  console.log(existuser);
//  if (existuser) {
//   console.log("login successful");
//   res.redirect("/")
//  }else{
//   console.log("login failed");
//   res.redirect("/login")
//  }
})

app.get("/edit/todo/:id",async (req,res)=>{
  const { id } = req.params
  const onetodo = await todomodel.findOne({_id:id})
  console.log(onetodo);
  
  res.render('edit',{onetodo})
})

app.post("/todo/edit/:id", async (req,res)=>{
  const { id } = req.params
  const {title,content} = req.body
 const editedTodo = await todomodel.findByIdAndUpdate(
    {_id:id},
    {title:title, content:content},
    {new:true}
  )
  console.log(editedTodo);
  
  if (editedTodo) {
    console.log("todo edited successfully");
    
    res.redirect("/todo")
  }else{
    console.log("unable to edit todo");
    res.redirect("/todo")
  }
  
})





connect()
const port = 5000
app.listen(port,()=>{
  console.log(`App started on port ${port}`);
  
})