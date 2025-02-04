import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate()
  const [userdetail, setuserdetails] = useState({
    email:"",
    password:""
  })
   const [loading, setloading] = useState(false)

  const LoginUser = () =>{
    const {email,password} = userdetail
    if (!email || !password)  {
      alert("input fields cannot be empty")
    }else{
      setloading(true)
      axios.post("http://localhost:5003/user/login",userdetail)
      .then((res)=>{
        console.log(res);
        localStorage.setItem("token", res.data.token)
         navigate("/dashboard")
      }).catch((err)=>{
        console.log(err);
        
      })
      .finally(()=>{
        setloading(false)
      })
    }
  }
  return (
    <div>
      <div className='mx-auto w-50 shadow px-3 py-3'>
        <h1>Login</h1>
        <div className='form-group mt-3'>
            <label htmlFor="">Email</label>
            <input value={userdetail.email}  onChange={(e)=> setuserdetails({...userdetail, email:e.target.value})} className='form-control '  type="text" />
        </div>
        <div className='form-group mt-3'>
            <label htmlFor="">Password</label>
            <input value={userdetail.password}  onChange={(e)=> setuserdetails({...userdetail, password:e.target.value})} className='form-control '  type="text" />
        </div>
        <div className=' mt-3'>
            <button disabled={loading} onClick={LoginUser} className='btn btn-dark'>{loading? "Loading..." : "Login"}</button>
        </div>
    
        </div>
        
    </div>
  )
}

export default Login