import mongoose from 'mongoose';
import TrackModel from '../models/track.model';

async function updateTracks() {
  try {
    await mongoose.connect('mongodb+srv://Luis:fWxu7L2KCOMXlGdt@apollofyapp.7qyokod.mongodb.net/test'); // Update this with your actual MongoDB connection string

    console.log('Updating tracks...');
    await TrackModel.updateMany({}, { $set: { playCount: 0 } });

    console.log('Update complete!');
  } catch (error) {
    console.error('Failed to update tracks:', error);
  } finally {
    await mongoose.disconnect();
  }
}

updateTracks();
