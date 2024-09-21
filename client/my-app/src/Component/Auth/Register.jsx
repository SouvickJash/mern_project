import React, { useState } from "react";
import axios from 'axios'
import "../Css/Register_login.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const[user,setUser]=useState({
    name:"",
    email:"",
    password:"",
    phone:"",
    city:"",
    pin:""
  })

 const handelSubmit=(e)=>{
   setUser({...user,[e.target.name]:e.target.value})
   
 }
 console.log("userdata",user);
 
  const submitFormData=async(e)=>{
    e.preventDefault();
     try{
       const responce = axios.post("http://localhost:12345/api/create",user)
       
       if(!responce){
        console.log("user not found")
       }
       else{
        console.log("responce",responce)
        navigate("/");
       }
     }
     catch(err){
      console.log(err)
     }
  }

  return (
    <>
      <div className="wrapper">
        <div className="title">Create Account</div>
        <form onSubmit={submitFormData}>
          <div className="field">
            <input type="text" required  name="name" onChange={handelSubmit}/>
            <label>Name</label>
           
          </div>
          <div className="field">
            <input type="text" required  name="email" onChange={handelSubmit}/>
            <label>Email</label>
          </div>
          <div className="field">
            <input type="password" required  name="password" onChange={handelSubmit}/>
            <label>Password</label>
          </div>
          <div className="field">
            <input type="number" required  name="phone" onChange={handelSubmit}/>
            <label>Phone</label>
          </div>
          <div className="field">
            <input type="text" required  name="city" onChange={handelSubmit}/>
            <label>City</label>
          </div>
          <div className="field">
            <input type="number" required  name="pin" onChange={handelSubmit}/>
            <label>Pin</label>
          </div>
          <div className="content">
            <div className="checkbox">
              <input type="checkbox" id="remember-me" />
              <label
                htmlFor="remember-me"
                style={{ marginBottom: 0, paddingRight: 222 }}
              >
                Remember me
              </label>
            </div>
            {/* <div className="pass-link">
        <a href="#">Forgot password?</a>
      </div> */}
          </div>
          <div className="field">
            <input type="submit" defaultValue="Login" />
          </div>
          <div className="signup-link">
            Already have account? <a href="/">Signin now</a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
