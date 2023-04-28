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

export const getAllUsers = async (_req: Request, res: Response) => {
	try {
		const users = await UserModel.find({}).lean().exec();
		res.status(200).send(users);
	} catch (error) {
		res.status(500).send({ message: (error as Error).message });
	}
};

export const getUser = async (req: Request, res: Response) => {
	const id = req.params.id;

	try {
		const user = await UserModel.findById(id).lean().exec();
		res.status(200).send(user);
	} catch (error) {
		res.status(500).send({ message: (error as Error).message });
	}
};
export const loginUser = async (req: Request, res: Response) => {
	const { email } = req.body;

	try {
		const user = await UserModel.findOne({ email }).lean().exec();

		if (user) {
			res.status(200).send({ message: 'User exists!', id: user._id });
		} else if (!user) {
			res.status(404).send({ message: 'User not found' });
		}
	} catch (error) {
		res.status(500).send({ message: (error as Error).message });
	}
};

export const updateUser = async (req: Request, res: Response) => {
	const id = req.params.id;
	const props = req.body;

	try {
		await UserModel.findByIdAndUpdate(id, props).lean().exec();

		const updatedProperties = Object.entries(props)
			.map(([key, value]) => `${key}: ${value}`)
			.join(', ');

		res
			.status(200)
			.send({ message: `User ${id} modified: ${updatedProperties}` });
	} catch (error) {
		res.status(500).send({ error: error });
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const user = await UserModel.findByIdAndDelete(id).lean().exec();
		res.status(200).send({ status: true, message: 'User Deleted', data: user });
	} catch (error) {
		res.status(500).send({ status: false, message: (error as Error).message });
	}
};
