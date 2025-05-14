import mongoose from "mongoose";



const userSchema = new mongoose.Schema({

    name:{ type: String, required: true },
    email:{ type: String, required: true, unique: true, lowercase:true, index:true, match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] },
    password:{ type: String, required: true },
    role:{ type: mongoose.Schema.Types.ObjectId, ref:'Role' },
    permissions:[{ type: String }],
    createdBy:{type: mongoose.Schema.Types.ObjectId, ref:'User'},

},{ timestamps:true, versionKey: false })


const User = mongoose.model('User', userSchema)

export default User