import mongoose from "mongoose";


const tokenSchema = mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Admin"
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    }
})

const employeeToken = mongoose.model("employeeToken", tokenSchema)

export default employeeToken;