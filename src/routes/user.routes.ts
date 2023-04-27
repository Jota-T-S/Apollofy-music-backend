import { Router } from 'express';
import {
	registerUser,
	getAllUser,
	loginUser
} from '../controllers/user.controller';

const userRouter = Router();

userRouter
	.post('/', registerUser)
	.get('/', getAllUser)
	.get('/login', loginUser);

// userRouter.patch('/update', updateUser);

export default userRouter;
