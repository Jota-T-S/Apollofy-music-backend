import { Router } from 'express';
import {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  passwordReset,
  updatePasswordReset,
  changePassword,
  likeSong,
  dislikeSong,
  getLikedSongs,
  getAllUsers,
  uploadImageUser
} from '../controllers/user.controller';

const userRouter = Router();

userRouter
  .get('/', getAllUsers)
  .post('/register', registerUser)
  .post('/login', loginUser) // Always put routes without params first
  .post('/password-reset', passwordReset)
  .patch('/update-password-reset', updatePasswordReset)
  .patch('/upload-image/:id', uploadImageUser)
  .post('/likes/:id', likeSong)
  .post('/dislikes/:id', dislikeSong)
  .get('/likes/:id', getLikedSongs)
  .get('/:id', getUser)
  .put('/change-password/:id', changePassword)
  .put('/:id', updateUser)
  .delete('/:id', deleteUser);

export default userRouter;
