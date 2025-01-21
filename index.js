const express = require("express")
const app = express()
 const ejs =  require("ejs")
 const mongoose = require("mongoose")

// middlewares
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))


const userschema = mongoose.Schema({
   username:{type:String,trim:true, required:true},
   email:{type:String,trim:true, unique:true, required:true},
   password:{type:String,trim:true, required:true}
})
const usermodel = mongoose.model("user_collections", userschema )

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


app.post("/todo/delete/:index",(req, res)=>{
  console.log(req.params);
  const {index} = req.params
  todoarray.splice(index,1)
  res.redirect("/todo")
})

app.post("/user/signup", async(req, res)=>{
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

app.get("/edit/todo/:index", (req,res)=>{
  const { index } = req.params
  console.log(todoarray[index]);
  
  const alltodo = todoarray[index]
  res.render('edit',{alltodo,index})
})

app.post("/todo/edit/:index", (req,res)=>{
  const { index } = req.params
  const {title,content} = req.body
  console.log(req.body);
  if (todoarray[index]){
    todoarray[index] = {title,content}
  }
  res.redirect("/todo")
})


const URI = "mongodb+srv://aishatadekunle877:aishat@cluster0.t92x8pf.mongodb.net/januaryclass?retryWrites=true&w=majority&appName=Cluster0"


const connect = async () =>{
  try {
   const connected = await mongoose.connect(URI)
   if (connected) {
    console.log("database connected successfully");
    
   }
  } catch (error) {
    console.log(error);
    
  }
}
connect()

const port = 5000
app.listen(port,()=>{
  console.log(`App started on port ${port}`);
  
})