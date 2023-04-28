import { Schema, model } from 'mongoose';

const TrackSchema = new Schema(
  {
    trackName: {
      type: String
    },
    rating: {
      type: Number
    },
    url: {
      type: String
    },
    popularity: {
      type: String
    },
    thumbnail: {
      type: String
    },
    duration: {
      type: Number
    },
    color: {
      type: String
    },
    userId: {
      type: String
    },
    genre: {
      id: { type: String },
      name: { type: String }
    },
    albums: [{ albumId: String }],
    likedBy: [{ userId: String }]
  },
  {
    timestamps: true
  }
);

const TrackModel = model('Track', TrackSchema);

export default TrackModel;
