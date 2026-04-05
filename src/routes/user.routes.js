import express from 'express';
import { createUser, getAllUsers,updateUser,deleteUser } from "../controllers/user.controller.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
const router = express.Router();

router.post('/users', authorizeRoles('admin'), createUser);
router.get('/users', authorizeRoles('admin','analyst'), getAllUsers);
router.patch('/users/:id', authorizeRoles('admin'), updateUser);
router.delete('/users/:id', authorizeRoles('admin'), deleteUser);



export default router;