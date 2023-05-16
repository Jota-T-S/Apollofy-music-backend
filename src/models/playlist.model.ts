import { Schema, model } from 'mongoose';
import { Playlist } from '../interfaces/playlist';

const PlaylistSchema = new Schema<Playlist>(
  {
    name: { type: String, required: [true, 'Playlist Name is required'] },
    collaborative: { type: Boolean, default: false },
    description: String,
    primaryColor: String,
    cover: String,
    thumbnail: String,
    publicAccessible: { type: Boolean, default: false },
    numberSongs: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    tracks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Track'
      }
    ],
    followedBy: [
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

const PlaylistModel = model('Playlist', PlaylistSchema);

export default PlaylistModel;
