import express from 'express';
import { register , login, getMyProfile , logout} from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/auth.js';
import { User } from '../models/userModel.js';

const router = express.Router();

// router.get('/all', getAllUsers);

router.post('/new', register);
router.post('/login', login);
router.get('/logout', logout);


router.get("/me", isAuthenticated,getMyProfile);

// router.get('/userid/:id', getUserID);
// router.put('/userid/:id', updateUser);
// router.delete('/userid/:id', deleteUser);
 
 
export default router;