import asyncHanndler from 'express-async-handler'
import Admin from '../models/employeeModel.js'
import jwt from 'jsonwebtoken'

export const adminProtect = asyncHanndler( async (req, res, next) => {
    try {
        const token = req.cookies.token

        if(!token){
            res.status(401)
            throw new Error("Not authorized, please login")
        }

        //verify token 
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        //get admin id from token
        const admin = await Admin.findById(verified.id).select("-password")

        if(!admin){
            res.status(401)
            throw new Error("Admin account not found")
        }

        req.admin = admin
        next()

    } catch (error) {
        res.status(401)
        throw new Error("Not auhorized, please login")
    }
})

export const clientProtect = asyncHanndler( async (req, res, next) => {
    try {
        const token = req.cookies.token

        if(!token){
            res.status(401)
            throw new Error("Not authorized, please login")
        }

        //verify token 
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        //get admin id from token
        const client = await Client.findById(verified.id).select("-password")

        if(!client){
            res.status(401)
            throw new Error("Account not found")
        }

        req.client = client
        next()

    } catch (error) {
        res.status(401)
        throw new Error("Not auhorized, please login")
    }
})