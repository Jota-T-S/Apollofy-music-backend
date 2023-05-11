import { Router } from 'express';
import {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  passwordReset,
  updatePasswordReset,
  changePassword
} from '../controllers/user.controller';

const userRouter = Router();

userRouter
  .post('/register', registerUser)
  .post('/login', loginUser) // Always put routes without params first
  .post('/password-reset', passwordReset)
  .patch('/update-password-reset', updatePasswordReset)
  .get('/:id', getUser)
  .put('/change-password/:id', changePassword)
  .put('/:id', updateUser)
  .delete('/:id', deleteUser);

export default userRouter;
