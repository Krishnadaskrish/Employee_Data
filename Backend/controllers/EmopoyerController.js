require('dotenv').config() ;
const mongoose = require ('mongoose') ;
const Employer = require ('../model/EmployerSchema') ;
const Employee = require ('../model/EmployeeSchema')
const jwt = require ('jsonwebtoken') ;
const bcrypt = require ('bcrypt') ; 

mongoose.connect('mongodb+srv://krishnadas10official:cjQTcxaEVtVROG29@cluster0.lhxnbqz.mongodb.net/Employee-database' ).then(() => console.log('DB Connected')).catch(err => console.log(err))
  

module.exports = {

    // Employer Registration using post method
    
    register : async (req,res) => {
        
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 
        const { name, email, username } = req.body ;
        await Employer.create({
                name : name ,
                email : email ,
                username : username ,
                password : hashedPassword  ,
            }) 

        res.status(201).json({message : "Admin successfully registred"})
            
        
        },


    // Employer login using post method

    login : async (req,res) => {
        const {username,password } = await req.body ;
        const employer = await Employer.findOne({
                username : username ,
            }) ; 
           if(!employer){
                return res.status(404).json({ message : "The requested employer was not found"})
             }

            const passwordMatch = await bcrypt.compare(password, employer.password);
            
            if (!passwordMatch){
                return res.status(401).json({error:"invalid Password"})
            }

         const token = jwt.sign (
                {username : employer.username},
                process.env.ACCES_TOKEN_SECRET 
            );

        res.status(201).json({message : "login successful",data : token})

        },

    // Employee registeration using post method

    EmoployeeRegister : async (req,res) => {
        const {name,email,username} = req.body

        
        await Employee.create({
            name : name ,
            email : email ,
            username : username ,
            

        })
        res.json({message : "employee created"})
       
        },


    // get all employees using get method

    GetAllEmployee : async (req,res) => {
        
        const allEmployee = await Employee.find()
            res.status(200).json({
                status : "success",
                message : "succesfully fetched employee",
                data : allEmployee
            })
            
        },


    // get employee by their id using get method

    GetEmployeeById : async (req,res) => {
            const EmployeeId = req.params.id ;
            const Employees = await Employee.findById(EmployeeId)
            if(!Employees){
                return res.status(404).json({error : "employee not found"})
            }
            res.status(200).json({
                status : "success",
                message : "succesfully fetched employee data",
                data : Employees
            })


        },

    // update employee using put method

    UpdateEmployeeById : async (req,res) => {

        const EmployeeId = req.params.id ;
        const {name,username,email} = req.body ;
        const employee = await Employee.findByIdAndUpdate(EmployeeId,{
            $set:{name ,username,email} 
        })
        if(!employee){
            return res.status(404).json({message:'user not found'})
        }

        res.status(200).json({message : 'succesfully updated employee'})
      },


   //delete employees using Delete method

    deleteEmployeeById : async (req,res) => {

        const employeeId = req.params.id
        const employee = await Employee.findByIdAndDelete(employeeId)

        if(!employeeId){
        return res.status(404).json({error : "employee not found"})
          }

        res.status(204).json({message : "employee delete succesfully"})

      }


}