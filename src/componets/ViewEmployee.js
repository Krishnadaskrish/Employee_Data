import React from 'react'
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody,MDBIcon } from 'mdb-react-ui-kit';
import { useEffect,useState } from 'react';
import toast from 'react-hot-toast';
import { Axios } from '../App';
import { useNavigate } from 'react-router';
import Adminav from './EmployerHome';
import axios from 'axios';

function ViewEmployee() {

    const [user,setUser] = useState([])
    console.log(user,'pppppppp')
    const jwtToken =  `Bearer ${localStorage.getItem("jwt_token")}`
    const navigate = useNavigate();

    const handlEdit = async (EmployeeId) => {
        navigate(`/edit/${EmployeeId}`)
        
      };
    

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await Axios.get("/employer/employee")
           
    
            if (response.status === 200) {
              setUser(response.data.data);
              console.log(response.data.data);
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchUsers();
      }, []);


  return (
     <>
      <Adminav/>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
            
          </tr>
        </thead>
        <tbody>
          {user.map((user, index) => (
            <tr key={user._id}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              
              <td>
                <img style={{ width: '50px', height: '50px' }} alt="" src={user.photo} />
              </td>
              <td>
              <button
                    className="btn btn-danger me-4"
                    
                  >
                    Delete
                  </button>
                <button
                    className="btn btn-primary me-5 "
                   onClick={()=> handlEdit(user._id)}
                  >
                    Edit
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ViewEmployee
