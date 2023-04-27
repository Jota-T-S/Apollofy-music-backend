import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import { User } from '../interfaces/user';

export const registerUser = async (req: Request, res: Response) => {
	const { name, lastName, email, password, confirmPassword, birthday }: User =
		req.body;
	try {
		const newUser = await UserModel.create({
			name,
			lastName,
			email,
			password,
			confirmPassword,
			birthday
		});
		res.status(200).send(newUser);
	} catch (error) {
		res.status(500).send({ message: (error as Error).message });
	}
};

export const getAllUser = async (_req: Request, res: Response) => {
	try {
		const users = await UserModel.find({});
		res.status(200).send(users);
	} catch (error) {
		res.status(500).send({ message: (error as Error).message });
	}
};

export const loginUser = async (req: Request, res: Response) => {
	const { email } = req.body;

	try {
		const user = await UserModel.findOne({ email });

		if (!user) {
			return res.status(404).send({ message: 'User not found' });
		} else if (user) {
			return res.status(200).send({ message: 'User exists!' });
		}
	} catch (error) {
		res.status(500).send({ message: (error as Error).message });
	}
};
