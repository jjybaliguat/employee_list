import express from 'express'
import { addEmployee, getALlEmployee, Login } from '../controllers/employeeController.js'
import { adminProtect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post("/login", Login)
router.post("/addemployee", addEmployee)
router.get("/getallemployees", getALlEmployee)
// router.post("/register", registerAdmin)
// router.post("/login", loginAdmin)
// router.get("/logout", logoutAdmin)
// router.get("/getadmin", adminProtect, getAdmin)
// router.get("/loggedin", loginStatus)
// router.patch("/updateadmin", adminProtect, updateAdmin)
// router.patch("/changepassword", adminProtect, changePassword)
// router.post("/forgotpassword", forgotPassword)
// router.put("/resetpassword/:resetToken", resetPassword)

export default router;
