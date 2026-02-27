import express from "express";
const router = express.Router()
import userRoutes from "./userRoutes.js";
import roleRoutes from "./roleRoutes.js";
import permissionRoutes from "./permissionRoutes.js";






router.use('/user', userRoutes);
router.use('/role', roleRoutes);
router.use('/permission', permissionRoutes);





export default router