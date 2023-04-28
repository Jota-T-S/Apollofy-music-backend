import { Schema, model } from 'mongoose';

const AlbumSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'Please provide a title']
		},
		year: {
			type: Number,
			required: [true, 'Please provide a year']
		},
		thumbnail: {
			type: String
		},
		totalTracks: {
			type: Number
		},
		userId: {
			type: String,
			required: [true, 'Please provide a user ID']
		},
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
