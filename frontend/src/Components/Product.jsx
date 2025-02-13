import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Product = () => {

const [productData ,setProductData] = useState({
    productname:"",
    productprice:"",
    productimage:[]
})

const handleImageFile = (e) =>{
    const imageFile = e.target.files;
    const filereaders = []
    
     let imageFileArray = [];
    Array.from(imageFile).map((image)=>{
        const reader = new FileReader()
        filereaders.push(reader)
           console.log(filereaders);
           
        
        reader.onload = (e) =>{
            imageFileArray.push(e.target.result)
            setProductData((prevState)=>({...prevState, productimage:imageFileArray }))
        }
        reader.readAsDataURL(image)
    })
    
}

const uploadProducts = () =>{
    axios.post("http://localhost:5003/user/uploaddd", productData)
    .then((res)=>{

    })
    .catch((err)=>{

    })
    

}


  return (
    <div>
        <input onChange={(e)=>setProductData({...productData, productname:e.target.value})} type="text"   name='productname'/>
        <input onChange={(e)=>setProductData({...productData, productprice:e.target.value})} type="text" name='productprice' />
        <input onChange={handleImageFile} multiple type="file" />
        <button onClick={uploadProducts}>Upload</button>
   
    </div>
  )
}
