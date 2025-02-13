import React from 'react'
import { Route, Routes } from 'react-router-dom'
  import Signup from './Components/Signup'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import Uploadproducts from './Components/Uploadproducts'
import { Product } from './Components/Product'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/products" element={<Product/>} />
        <Route path="/upload" element={<Uploadproducts/>} />
       </Routes>
    </div>
  )
}

export default App