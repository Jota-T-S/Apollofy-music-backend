import { Router } from "express";
import { registerUser } from "../controllers/user.controller";



const userRouter = Router();

userRouter
   .post('/', registerUser)


export default userRouter;