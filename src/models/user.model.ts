import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Please provide a username']
		},
		lastName: {
			type: String,
			default: ''
		},
		email: {
			type: String,
			required: [true, 'Enter a valid email']
		},
		password: {
			type: String,
			required: [true, "Password can't be blank"]
		},
		confirmPassword: {
			type: String,
			required: [true, "Password doesn't match"]
		},
		birthday: {
			type: Date,
			default: null
		}
	},
	{
		timestamps: true
	}
);

const UserModel = model('User', UserSchema);

export default UserModel;
