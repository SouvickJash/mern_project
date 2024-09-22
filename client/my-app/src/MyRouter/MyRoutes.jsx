import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from '../Component/Navbar/Nav';
import Register from '../Component/Auth/Register';
import Login from '../Component/Auth/Login';
import Home from '../Component/Home/Home';
import Edit from '../Component/Home/Edit';
 
const MyRoutes = () => {
  return (
   <>
       <BrowserRouter>
        <Nav/>
         <Routes>
            <Route path='/home' element={<Home/>}/>
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/edit/:id' element={<Edit/>}/>
         </Routes>
       </BrowserRouter>
   </>
  )
}

export default MyRoutes
