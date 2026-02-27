import User from "../models/userModel.js";
import { hash } from "../utils/hash.js";
import { Token } from "../utils/token.js"



export const signUp = async(req, res) => {
        try {
            const { name, email, password, role } = req.body

            if (name || email || password || role) {
                return res.status(400).json({status:false , messsage:"missing required permeters"})
                
            }
            const existUser = await User.find({email})

            if (existUser) {
                return res.status(400).json({ status:false, error: "User already exists" });
            }
            const hashPassword = await hash(password)
            const newUser = new User({
                name,
                email,
                password:hashPassword,
                role,
            })

            await newUser.save()
            return res.status(201).json({ status: true, message: "User registered successfully"})
        } catch (error) {
            return res.status(500).json({status: false, message: "internal server error", error})
        }
}

export const login = async(req, res) => {
    try {
        
        const { email, password } = req.body
        
        if ( !email || !password) {
            return res.status(400).json({status:false , messsage:"missing required permeters"})
            
        }
        const user = await User.findOne({email})

        if (!user) {
           return res.status(400).json({ status: false, message: "User not found"})
        }
      
        // genareting jwt token 
        const token = await Token(user?._id)

        return res.status(200).json({ status: true, message:`Hello ${user.name}, Welcome to Dashboard...!`, token:token })
    } catch (error) {
        return res.status(500).json({status: false, message: "internal server error", error})
    }
}

export const fetchUser = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ status: true, message: "Profile data fetched successfully", data: user });
  } catch (error) {
    return res.status(500).json({ status: false, message: "internal server error", error });
  }
};

export const addUser = async(req, res) => {
    try {
        const { name, email, password, role, permissions } = req.body
        const userId = req.user

        if (name || email || password || role || permissions) {
            return res.status(400).json({status:false , messsage:"missing required permeters"})
        }
        const existUser = await User.find({email})

        if (existUser) {
            return res.status(400).json({ status:false, error: "User already exists" });
        }
        const hashPassword = await hash(password)
        const User = new User({
            name,
            email,
            password:hashPassword,
            role,
            permissions,
            createdBy:userId
        })

        await User.save()
        return res.status(201).json({ status: true, message: "User Added successfully"})
    } catch (error) {
        return res.status(500).json({status: false, message: "internal server error", error})
    }
}

export const updateUser = async(req, res) => {
    try {
        const userId = req.user

        const userData = { ...req.body };

        // Only hash password if it exists in the request body
        if (userData.password) {
            userData.password = await hash(userData.password);
        }

        const userUpdated = await User.findByIdAndUpdate(userId, userData, { new: true });
        if (!userUpdated) {
            return res.status(400).json({ status:false, error: "User not found" });
        }
        
        return res.status(201).json({ status: true, message: "User Updated successfully"})
    } catch (error) {
        return res.status(500).json({status: false, message: "internal server error", error})
    }
}


export const deleteUser = async(req, res) => {

     try {
        const id = req.prarams.id
        const deleteUser = await User.deleteById(id)
        return res.status(200).json({status: true, message: "User Deleted successfully"})
    } catch (error) {
        return res.status(500).json({status: false, message: "internal server error", error})
    }
}