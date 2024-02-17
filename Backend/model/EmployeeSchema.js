const mongoos = require("mongoose")
const employeeSchema = new mongoos.Schema({
    name:String,
    email:String,
    username:String,
    password:String,

})

module.exports = mongoos.model("Employee" , employeeSchema)