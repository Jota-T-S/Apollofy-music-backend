import { Router } from 'express';
import {
  createTrack,
  deleteTrack,
  getAllTrack,
  updateTrack
} from '../controllers/track.controller';

const trackRouter = Router();

trackRouter
  .get('/', getAllTrack)
  .post('/create', createTrack)
  .delete('/:id', deleteTrack)
  .put('/:id', updateTrack);

export default trackRouter;
