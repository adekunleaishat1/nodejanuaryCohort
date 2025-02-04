import axios from 'axios'
import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
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
 
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard