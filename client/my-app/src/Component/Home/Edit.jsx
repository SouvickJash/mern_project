import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = () => {
    const { id } = useParams();
    const navigate=useNavigate()
    const[values,setValue]=useState({
        // id:id,
        name:"",
        email:"",
        city:"",
        phone:""
    })
   
    // edit user
   useEffect(()=>{
    axios.get(`http://localhost:12345/api/edit/${id}`)
    .then(res=>
        {
            
        setValue({...values, name:res.data.data.name, email:res.data.data.email,
            phone:res.data.data.phone,city:res.data.data.city,pin:res.data.data.pin
        })
    })
    .catch(err=>console.log(err))
   },[])


   //update data    
   const handleSubmit=(e)=>{
    e.preventDefault();
    axios.put(`http://localhost:12345/api/update/${id}`,values)
    .then(res=>
        {
            toast.success("Data updated successfully");
            navigate('/home')
           
    })
    .catch(err=>console.log(err))
   }

  return (
    <>
      <div className="wrapper">
        <div className="title">Create Account</div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input type="text" required name="name" value={values.name} onChange={e=>setValue({...values,name:e.target.value})}/>
            <label>Name</label>
          </div>

          <div className="field">
            {/* <input type="text" required name="email" value={values.email} onChange={e=>setValue({...values,email:e.target.value})}/> */}
            <input type="text" required name="email" value={values.email} disabled/>
            {/* <label>Email</label> */}
          </div>
     
          <div className="field">
            <input type="number" required name="phone" value={values.phone} onChange={e=>setValue({...values,phone:e.target.value})}/>
            <label>Phone</label>
          </div>

          <div className="field">
            <input type="text" required name="city" value={values.city} onChange={e=>setValue({...values,city:e.target.value})}/>
            <label>City</label>
          </div>

          <div className="field">
            <input type="number" required name="pin" value={values.pin} onChange={e=>setValue({...values,pin:e.target.value})}/>
            <label>Pin</label>
          </div>

          <div className="field">
            <input type="submit" defaultValue="Login" style={{marginTop:15}}/>
          </div>
       
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Edit;
