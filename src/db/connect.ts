import mongoose from 'mongoose';
import config from '../config/config';

const connectDB = () => {
  return mongoose.connect(config.db.URI!);
};

export default connectDB;
