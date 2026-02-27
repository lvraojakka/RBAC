import express from 'express';
import { signUp, login,fetchUser, addUser, updateUser, deleteUser } from '../controllers/userController.js';
import verifyLogin from '../middelwares/verify-login.js';
const router = express.Router();


router.post('/register', signUp);
router.post('/login', login);

router.use(verifyLogin);

router.get('/profile', fetchUser);
router.post('/add', addUser);
router.put('/update', updateUser);
router.delete('/delete', deleteUser);





export default router;