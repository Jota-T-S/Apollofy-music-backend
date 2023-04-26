import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import { User } from '../interfaces/user';

export const registerUser = async (req:Request, res:Response) =>{
   const { name, lastName, email, password, confirmPassword, birthay }:User = req.body;
   const newUser = await UserModel.create({name, lastName, email, password, confirmPassword, birthay})
   res.status(200).send(newUser)
}

