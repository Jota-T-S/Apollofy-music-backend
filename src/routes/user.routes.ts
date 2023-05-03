import { Router } from 'express';
import {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser
} from '../controllers/user.controller';

const userRouter = Router();

userRouter
  .post('/register', registerUser)
  .post('/login', loginUser) // Always put routes without params first
  .get('/:id', getUser)
  .put('/:id', updateUser)
  .delete('/:id', deleteUser);

export default userRouter;
