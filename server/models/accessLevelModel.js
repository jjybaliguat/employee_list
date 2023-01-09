import mongoose from 'mongoose'

const accessLevelSchema = mongoose.Schema({
    access_level_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Employee"
    },
    description: {
        type: String,
        required: true,
        default: 'Super User'
    },
},
{
    timestamps: true,
}
)

const AccessLevel = mongoose.model("AccessLevel", accessLevelSchema)

export default AccessLevel;