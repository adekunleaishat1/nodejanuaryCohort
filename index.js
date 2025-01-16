const express = require("express")
const app = express()
 const ejs =  require("ejs")
 const mongoose = require("mongoose")

// middlewares
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))


const userschema = mongoose.Schema({
   username:{type:String},
   email:{type:String},
   password:{type:String}
})

 const usermodel = mongoose.model("User_collection", userschema )

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