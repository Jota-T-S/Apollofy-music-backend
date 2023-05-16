import { Schema, model } from 'mongoose';

const TrackSchema = new Schema(
  {
    trackId: {
      type: String
    },
    name: {
      type: String
    },
    rating: {
      type: Number,
      default: 0
    },
    url: {
      type: String
    },
    popularity: {
      type: Number,
      default: 0
    },
    thumbnail: {
      type: String
    },
    duration: {
      type: String
    },
    color: {
      type: String,
      default: null
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    genre: {
      type: String,
      default: null
    },
    albums: {
      type: Schema.Types.ObjectId,
      ref: 'Album',
      default: null
    },
    likedBy: {
      type: [{ userId: String }],
      default: null
    },
    releasedAt: {
      type: Date
    },
    artists: {
      type: [{ id: String, name: String }]
    }
  },
  {
    timestamps: true
  }
);

const TrackModel = model('Track', TrackSchema);

export default TrackModel;
