import { Schema, model } from 'mongoose';

const trackSchema = new Schema({
	songName: {
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
	albums: [{}]
});
