import { Schema, model } from 'mongoose';

const RolSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: 'User'
  }
});

const RolModel = model('Rol', RolSchema);
export default RolModel;
