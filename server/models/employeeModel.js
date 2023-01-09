import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const employeeSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "fName is Required"]
    },
    lastname: {
        type: String,
        required: [true, "lastname is Required"]
    },
    age: {
        type: Number,
        required: [true, "age is Required"]
    },
    birth_date: {
        type: Date,
        required: [true, "Name is Required"]
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "password is Required"],
        minLenght: [6, "Password is at least 6 characters"],
        //maxLenght: [25, "Password must not be more than 23 characters"]
    },
    job_title: {
        type: String,
        required: [true, "Job Title is required"],
    },
    access_level_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AccessLevel"
    },
},
{
    timestamps: true,
}
)

//Encrypt Password before saving to DB
employeeSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return next()
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})

const Employee = mongoose.model("Employee", employeeSchema)

export default Employee;