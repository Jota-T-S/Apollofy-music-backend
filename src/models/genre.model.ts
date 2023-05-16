import { Schema, model } from 'mongoose';

const GenreSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: 'Genre'
  },
  color: {
    type: String
  },
  image: {
    type: String
  }
});

const GenreModel = model('Genre', GenreSchema);
export default GenreModel;
