const express = require('express') ;
const app = express() ;
const Port = 3002 ;
const employerRouter = require('./route/EmployerRoute')
const cors = require ('cors')

app.use(cors())

app.use(express.json())
app.use('/employer',employerRouter)

app.use((req, res, next) => {
    console.log(`Received ${req.method} request to ${req.url}`);
    next();
});

app.listen(Port,(err) => {
    if(err) {
        console.log(err)
    }else {
        console.log(`server is running om port ${Port}`)
    }
})


