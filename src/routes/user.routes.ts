import { Router } from 'express';
import {
	registerUser,
	getAllUser,
	loginUser,
	updateUser,
	deleteUser
} from '../controllers/user.controller';

const userRouter = Router();

userRouter
	.post('/register', registerUser)
	.get('/', getAllUser)
	.get('/login', loginUser)
	.put('/update/:id', updateUser)
	.delete('/delete/:id', deleteUser);

// userRouter.patch('/update', updateUser);

export default userRouter;
