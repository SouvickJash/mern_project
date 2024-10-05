import "../Css/Nav.css"
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const Logout=()=>{
    localStorage.removeItem("authToken");
    navigate("/");
  }
  return (
    <>
      <div class="topnav" id="myTopnav">
        <a href="/home" class="active">
          Home
        </a>
        {/* <a href="#contact">Contact</a> */}
        {/* <a href="#about">About</a> */}
        <div className="login_logout">
        {/* <a href="/register">Register</a> */}
        <a href="/">Login</a>
        <a onClick={Logout} href="/">Logout</a>
        {/* <button onClick={Logout}>logout</button> */}
        </div>
      </div>
    </>
  );

};

export default Nav;
