import mongoose from "mongoose";



const roleSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    permissions:[{ type: mongoose.Schema.Types.ObjectId, ref:'Permission' }],
    createdBy:{type: mongoose.Schema.Types.ObjectId, ref:'User'}
},{ timestamps:true, versionKey: false })


const Role = mongoose.model('Role', roleSchema)

export default Role