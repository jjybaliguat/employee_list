import asyncHanndler from 'express-async-handler'
import Employee from '../models/employeeModel.js'
import AccessLevel from '../models/accessLevelModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Token from '../models/employeeTokenModel.js'
import crypto from 'crypto'

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
}

//Login Employee
export const Login = asyncHanndler( async (req, res) => {
    const { email, password } = req.body

    //Validate request
    if(!email || !password){
        res.status(400)
        throw new Error("Please enter email and Password")
    }

    //check if admin Exist
    const employee = await Employee.findOne({email})

    if(!employee){
        res.status(400)
        throw new Error("Email not found")
    }
    //Checck if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, employee.password)

    //Generate Token
    const token = generateToken(employee._id)

    //Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 86400), //1day
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })

    if(employee && passwordIsCorrect){
        const { _id, name, email, phone, accessType, photo} = employee
        res.status(200).json({
            _id,
            name,
            email, 
            accessType, 
            phone, 
            photo,
            token,
        })
    }else{
        res.status(400)
        throw new Error("Invalid Email or Password")
    }
})

//Register Admin
export const addEmployee = asyncHanndler( async (req, res) => {
    const {firstname, lastname, age, birth_date, email, password, job_title, accessLevel} = req.body
    if (!firstname || !lastname || !age || !birth_date || !email || !password || !job_title || !accessLevel) {
        res.status(400)
        throw new Error("Please fill all required fields!")
    }
    if(password.length < 6){
        res.status(400)
        throw new Error("Password mus be at least 6 characters!")
    }
    //check if email already exist
    const EmployeeExist = await Employee.findOne({email})
    if(EmployeeExist){
        res.status(400)
        throw new Error("Email already exist!")
    }

    const employee = await Employee.create({
        firstname, lastname, age, birth_date, email, password, job_title
    })

    //Generate Token
    const token = generateToken(employee._id)

    //Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), //1 day
        sameSite: "none",
        secure: true,
    })

    if(employee){
        const access = await AccessLevel.create({
            access_level_id: employee._id,
            description: accessLevel
        })
        if(access){
        const { _id, firstname, lastname, age, birth_date, email, password, job_title, accessLevel} = employee
        res.status(201).json({
            _id,
            firstname, 
            lastname, 
            age, 
            birth_date, 
            email, 
            password, 
            job_title,
            accessLevel,
            token,
        })
    }
    }else{
        res.status(400)
        throw new Error("Invalid Employee Data")
    }
})

export const logoutEmployee = asyncHanndler( async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0), //1 day
        sameSite: "none",
        secure: true
    })
    return res.status(200).json({
        message: "Successfully Logged Out"
    })
})

//get Admin Profile

export const getEmployee = asyncHanndler( async (req, res) => {
    const employee = await Employee.findById(req.admin._id)

    if(employee){
        const { _id, firstname, 
            lastname, 
            age, 
            birth_date, 
            email, 
            password, 
            job_title,} = employee
        res.status(200).json({
            firstname, 
            lastname, 
            age, 
            birth_date, 
            email, 
            password, 
            job_title,
        })
    }else{
        res.status(400)
        throw new Error("Employee not found")
    }
})
export const getALlEmployee = asyncHanndler( async (req, res) => {
    try {
        const employees = await Employee.find({})
        res.json(employees)
    } catch (error) {
        res.json(error)
    }
})

// //get login status
// export const loginStatus = asyncHanndler( async (req, res) => {
//     // res.send("Logged in Status")
//     const token = req.cookies.token

//     if(!token){
//         return res.json(false)
//     }
//     const verified = jwt.verify(token, process.env.JWT_SECRET)
//     if(verified){
//         return res.json(true)
//     }
//     return res.json(false)
// })
