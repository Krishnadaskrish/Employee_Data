const express = require ('express') ;
const router = express.Router()
const employerController = require ('../controllers/EmopoyerController')
const  tryCatch = require ('../middleware/tryCatchMiddileware')
const verifyToken = require ('../middleware/authMiddleware')
const multer = require('multer')
const uplode = multer({dest:"uplodes"})

router.use(express.json())

router.post('/register',tryCatch(employerController.register))
router.post('/login',tryCatch(employerController.login))
//
router.post("/employee",verifyToken,uplode.single('photo'),tryCatch(employerController.EmoployeeRegister))
router.get('/employee',verifyToken,tryCatch(employerController.GetAllEmployee))
router.get('/employee/:id',verifyToken,tryCatch(employerController.GetEmployeeById))
router.put ('/employee/:id',verifyToken,tryCatch(employerController.UpdateEmployeeById))
router.delete('/employee/:id',verifyToken,tryCatch(employerController.deleteEmployeeById))


module.exports = router