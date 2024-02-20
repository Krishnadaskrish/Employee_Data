import { Axios } from "../App";

import React, {  useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";


export default function CreateEmployee() {
  const navigate = useNavigate();



  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [username , setUsername] = useState("");
  const [photo ,setPhoto] = useState(null);



  const handleImageChange = (e) => {
    // Update the state with the selected image file
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    console.log('clicked')
    e.preventDefault();
  
    if (!name || !email || !username || !photo ) {
      toast.error("Please fill in all fields.");
      return;
    }
  

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("username", username);
    
    console.log(formData)
   
    
    
   
    try {
      const jwtToken =  localStorage.getItem('jwt_token')
      
      
      const response = await Axios.post(
        "employer/employee",
        formData,
        {
          headers: {
            Authorization: jwtToken,
            'Content-Type': 'multipart/form-data', 
            
          },
        }
        );
        
       
 
  
      
      if (response.status === 200) {
        
        toast.success("Product added successfully!");
        navigate("/adminhome");
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }


  };

  

  return (
    <section>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h2 className="text-center">Add Product</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="type" className="form-label">
              Email
              </label>
              <input
                type="text"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              

              <label htmlFor="description" className="form-label">
                username
              </label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              

              <button type="submit" className="btn btn-success mt-4">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}