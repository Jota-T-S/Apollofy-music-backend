import { Schema, model } from 'mongoose';

const AlbumSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title']
    },
    year: {
      type: String,
      required: [true, 'Please provide a year']
    },
    thumbnail: {
      type: String
    },
    totalTracks: {
      type: Number
    },
    url: {
      type: String
    },
    id: {
      type: String,
    },
    tracks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Track'
      }
    ],
    likedBy: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const AlbumModel = model('Album', AlbumSchema);

export default AlbumModel;
