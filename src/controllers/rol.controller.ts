import { Request, Response } from 'express';
import RolModel from '../models/rol.model';
import UserModel from '../models/user.model';

export const getAllRols = async (_req: Request, res: Response) => {
  try {
    const rols = await RolModel.find().lean().exec();

    res.status(200).send({ status: true, data: rols });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const getUsersByRol = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const users = await UserModel.find({ rol: id }).lean().exec();
    res.status(200).send({ status: true, data: users });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};
