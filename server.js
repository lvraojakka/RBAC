import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

const PORT= process.env.PORT
const MONGO_URL = process.env.MONGO_URL
const app = express()
app.use(cors())
app.use(helmet())


mongoose.connect(MONGO_URL)
.then(()=>{
    console.log(`MongoDB Connected Successfully`);
    
})
.catch((err) => {
    console.log(`Error: Failed to connect DataBase: ${err}`);
    
})













app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
    
})
