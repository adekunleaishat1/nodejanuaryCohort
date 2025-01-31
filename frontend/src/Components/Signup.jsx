import React,{useState} from 'react'
import axios from 'axios'

const Signup = () => {
    const [userdetail, setuserdetails] = useState({
        username:"",
        email:"",
        password:"",
    })
    const RegisterUser = ()=>{
        console.log(userdetail);
        axios.post("http://localhost:5003/user/signup",userdetail)
        .then((res)=>{
            console.log(res.data.message);
        }).catch((err)=>{
            console.log(err);
        })
    }
  return (
    <div>
        <div className='mx-auto w-50 shadow px-3 py-3'>
        <h1>Signup</h1>
        <div className='form-group mt-3'>
            <label htmlFor="">Username</label>
            <input value={userdetail.username} onChange={(e)=> setuserdetails({...userdetail, username:e.target.value})} className='form-control '  type="text" />
        </div>
        <div className='form-group mt-3'>
            <label htmlFor="">Email</label>
            <input value={userdetail.email}  onChange={(e)=> setuserdetails({...userdetail, email:e.target.value})} className='form-control '  type="text" />
        </div>
        <div className='form-group mt-3'>
            <label htmlFor="">Password</label>
            <input value={userdetail.password}  onChange={(e)=> setuserdetails({...userdetail, password:e.target.value})} className='form-control '  type="text" />
        </div>
        <div className=' mt-3'>
            <button onClick={RegisterUser} className='btn btn-dark'>Register</button>
        </div>
        </div>
    </div>
  )
}

export default Signup