import React, { useEffect, useState } from "react";
import "../Css/Home.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const getUser = async () => {
    try {
      const responce = await axios.get("http://localhost:12345/api/get");
      
      if (!responce) {
        console.log("not found");
      } else {
        // console.log("++", responce?.data);
        
        setUser(responce.data?.data)
      }
      // setUser(responce)
    } catch (err) {
      console.log(err);
    }



    const  isCheck= () => {
      let token = localStorage.getItem("authToken");
      if (token === null) {
        navigate("/");
      } else {
        // navigate("/home");
      }
      console.log("token....+", token);
    };
  };



  // delete api
  const deleteData=async(id)=>{
   
    try{
      const responceDelete = await axios.delete(`http://localhost:12345/api/delete/${id}`);

      if (responceDelete.status !== 200) {
        console.log("Failed to delete data", responceDelete);
      } else {
        // toast.success("Data Deleted Successfully")
        toast.success("Data deleted successfully");
        console.log("Data deleted", responceDelete);
        getUser();
      }
    }
    catch(err){
      console.log(err)
    }
  }
  

  useEffect(() => {
    getUser();
    // isCheck();
  }, []);
  return (
    <>
      <table>
        <tr>
          <th>Sl.no</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>City</th>
          <th>Pin</th>
          <th colspan="2">Action</th>
          
        </tr>
        {user.map((item, index) => {
          return (
            <>
              <tr>
                <td>{index}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.city}</td>
                <td>{item.pin}</td>
                <td><button type="button" class="btn btn-primary btn-sm" >Update</button></td>
                <td><button type="button" class="btn btn-danger btn-sm" onClick={()=>deleteData(item._id)}>Delete</button></td>
              </tr>
            </>
          );
        })}
      </table>
      <ToastContainer />
    </>
  );
};

export default Home;


