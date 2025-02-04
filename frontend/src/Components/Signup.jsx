import React,{useState} from 'react'
import axios from 'axios'
import {ToastContainer, toast}  from 'react-toastify'

const Signup = () => {
    const [userdetail, setuserdetails] = useState({
        username:"",
        email:"",
        password:"",
    })
    const [loading, setloading] = useState(false)

    const RegisterUser = ()=>{
        console.log(userdetail);
        setloading(true)
        axios.post("http://localhost:5003/user/signup",userdetail)
        .then((res)=>{
            setloading(false)
            console.log(res.data.message);
            toast.success(res.data.message)
        }).catch((err)=>{
            setloading(false)
            let errormessage = err?.response?.data?.message
            toast.error(errormessage)
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
            <button disabled={loading} onClick={RegisterUser} className='btn btn-dark'>{loading? "Loading..." : "Signup"}</button>
        </div>
        <ToastContainer/>
        </div>
    </div>
  )
}

export default Signup