import './App.css';
import Registration from './componets/Registration';
import Login from './componets/Login';
import EmployerHome from './componets/EmployerHome';
import CreateEmployee from './componets/CreateEmployee';
import ViewEmployee from './componets/ViewEmployee';
import EmployerEdit from './componets/EmployerEdit';
import { MyContext } from './context/MyContext';
import toast, { Toaster } from "react-hot-toast";
import { Route,Router, Routes } from 'react-router-dom';
import axios from 'axios';


export const Axios = axios.create({
  baseURL : "http://localhost:3002",
  headers: {
    "Content-Type":"application/json",
    Authorization: localStorage.getItem('jwt_token'),
  }

})






function App() {
  return (
   <>
  <MyContext.Provider >
  <Toaster/>
  <Routes>
    <Route path = '/' element = {<Registration/>}/>
    <Route path='/log' element = {<Login/>}/>
    <Route path ='/adminhome' element = {<EmployerHome/>}/>
    <Route path = '/addemployee' element = {<CreateEmployee/>}/>
    <Route path= '/view' element = {<ViewEmployee/>}/>
    <Route path = "/edit" element = {<EmployerEdit/>} />



  </Routes>





  </MyContext.Provider>

   </>
  );
}

export default App;
