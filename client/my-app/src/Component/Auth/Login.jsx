import React, { useState } from 'react'
import '../Css/Register_login.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [login,setLogin]=useState({
    email:"",
    password:"",
  })

  const handelSubmit=(e)=>{
    setLogin({...login,[e.target.name]:e.target.value})
    
  }
  console.log("userdata",login);
  
  const submitFormData = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post("http://localhost:12345/api/login", login);
  
      const token = res?.data?.data?.token; 
      console.log("Token:", token); 
  
      // Check if the response contains the token
      if (!token) {
        console.log("User not found");
      } else {

        localStorage.setItem("authToken", token);
        navigate("/home");
      }
    } catch (err) {
      // Log any errors encountered
      console.log("Error:", err);
    }
  };
  



  setTimeout(() => {
    setLoading(false);
  }, 1000);

  if (loading) {
    return (
      <>
        <div className="loader">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="h-12 w-12 flex-shrink-0 spin"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 11h5v2H2zm15 0h5v2h-5zm-6 6h2v5h-2zm0-15h2v5h-2zM4.222 5.636l1.414-1.414 3.536 3.536-1.414 1.414zm15.556 12.728-1.414 1.414-3.536-3.536 1.414-1.414zm-12.02-3.536 1.414 1.414-3.536 3.536-1.414-1.414zm7.07-7.071 3.536-3.535 1.414 1.415-3.536 3.535z"></path>
          </svg>
        </div>
      </>
    );
  }
  return (
    <>
    <div className="wrapper">
  <div className="title">
    Login Form
  </div>
  <form onSubmit={submitFormData}>
    <div className="field">
      <input type="text" required name="email" onChange={handelSubmit}/>
      <label>Email Address</label>
    </div>
    <div className="field">
      <input type="password" required name="password" onChange={handelSubmit}/>
      <label>Password</label>
    </div>
    <div className="content">
      <div className="checkbox">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me" style={{marginBottom:0}}>Remember me</label>
      </div>
      <div className="pass-link">
        <a href="/forgetpassword">Forgot password?</a>
      </div>
    </div>
    <div className="field">
      <input type="submit" defaultValue="Login" />
    </div>
    <div className="signup-link">
      Not a member? <a href="/register">Signup now</a>
    </div>
  </form>
</div>
    </>
  )
}

export default Login
