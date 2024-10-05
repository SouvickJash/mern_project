import React, { useEffect, useState } from "react";
import "../Css/Home.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const id=useParams()
  const [user, setUser] = useState([]);
  // const [delete,setDelete]=useState([])

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
  
  // delete many
  // const deleteMany=async(id)=>{
      // console.log(id)
      
  // }
  // const handleCheckboxChange = async() =>{
  //   try {
  //     const response = await axios.delete("http://localhost:12345/api/deleteMany")
  //     console.log("res",response)
  //   } catch (err) {
  //     console.log("Error deleting selected users", err);
  //   }
  // }
  useEffect(() => {
    getUser();
    // isCheck();
  }, []);
  return (
    <>
      <table>
        {/* <button className="btn btn-danger btn-sm" onClick={deleteMany}>Delete All</button> */}
        <tr>
          <th>Action</th>
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
                {/* <td><input type="checkbox" name="checkbox" onChange={() => handleCheckboxChange(user._id)}/></td> */}
                <td><strong>{index + 1}</strong></td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.city}</td>
                <td><strong>{item.pin}</strong></td>
               
               
                <td><Link to={`/edit/${item._id}`} type="button" class="btn btn-primary btn-sm">Update</Link></td>
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


