import mongoose from 'mongoose';
import TrackModel from '../models/track.model';
import config from '../config/config';

async function updateTracks() {
  try {
    await mongoose.connect(config.db.URI!); // Update this with your actual MongoDB connection string

    await TrackModel.updateMany({}, { $set: { playCount: 0 } });
    console.log('funcion ejecutada');
  } catch (error) {
    console.error('Failed to update tracks:', error);
  } finally {
    await mongoose.disconnect();
  }
}

updateTracks();
