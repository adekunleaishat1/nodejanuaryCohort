import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
   const [image, setimage] = useState("")
    const navigate = useNavigate()
 const token = localStorage.getItem("token")
 useEffect(() => {
     axios.get("http://localhost:5003/user/verify",{
        headers:{
            Authorization:`bearer ${token}`,      
        }
     }).then((res)=>{
        console.log(res);
        
     }).catch((err)=>{
        if (err) {
           navigate("/login") 
        }
        console.log(err);
        
     })
 }, [])

  const inputfilechange = (e) =>{
   const imagefile = e.target.files[0]
   const reader = new FileReader()
   reader.onload = (e) =>{
      console.log(e.target.result);
      setimage(e.target.result)
      
   }
   reader.readAsDataURL(imagefile)

  }

  const Uploadprofile = () =>{
   axios.post("http://localhost:5003/user/upload",{image},{
      headers:{
         Authorization:`bearer ${token}`,      
     }
   })
   .then((res)=>{
      console.log(res);
      
   }).catch((err)=>{
      console.log(err);
      
   })
  }

  return (
    <div>
    <input onChange={inputfilechange} type="file" />
    <button onClick={Uploadprofile}>Upload</button>
    </div>
  )
}

export default Dashboard