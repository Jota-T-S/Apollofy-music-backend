import { Router } from 'express';
import {
  createTrack,
  deleteTrack,
  getAllTrack,
  updateTrack,
  getTracksOfUser
} from '../controllers/track.controller';

const trackRouter = Router();

trackRouter
  .get('/', getAllTrack)
  .post('/create/:id', createTrack)
  .get('/:id', getTracksOfUser)
  .delete('/:id', deleteTrack)
  .put('/:id', updateTrack);

export default trackRouter;
