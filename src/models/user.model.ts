import mongoose, { Model, Schema, model } from 'mongoose';
import { Track } from '../interfaces/track';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { Rol } from '../interfaces/rol';

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  thumbnail?: string;
  birthday: String;
  rol: Rol;
  tracks: Track[];
  likedTracks: Track[];
}

interface IUserModel extends Model<IUser> {
  signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    birthday: Date,
    rol?: mongoose.Types.ObjectId
  ): IUser;
  login(email: string, password: string): IUser;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required']
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
    thumbnail: {
      type: String,
      default:
        'https://res.cloudinary.com/dvsab2hi0/image/upload/v1684417680/icons-genre/user-icon_rjahcw.png'
    },
    birthday: {
      type: String,
      default: null
    },
    rol: {
      type: Schema.Types.ObjectId,
      ref: 'Rol',
      default: null
    },
    tracks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Track'
      }
    ],
    likedTracks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Track'
      }
    ]
  },
  {
    timestamps: true
  }
);

UserSchema.statics.signup = async function (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  birthday: Date,
  rol: string
) {
  //validation
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  if (password !== confirmPassword) {
    throw Error('Passwords do not match');
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    firstName,
    lastName,
    birthday,
    rol
  });

  return user;
};

UserSchema.statics.login = async function (email: string, password: string) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

const UserModel = model<IUser, IUserModel>('User', UserSchema);

export default UserModel;
