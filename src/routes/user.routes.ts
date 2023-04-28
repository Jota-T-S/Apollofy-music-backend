import { Router } from 'express';
import {
  registerUser,
  getAllUsers,
  loginUser,
  updateUser,
  deleteUser,
  getUser
} from '../controllers/user.controller';

const userRouter = Router();

userRouter
  .post('/register', registerUser)
  .get('/', getAllUsers)
  .get('/:id', getUser)
  .get('/login', loginUser)
  .put('/update/:id', updateUser)
  .delete('/delete/:id', deleteUser);

export default userRouter;
