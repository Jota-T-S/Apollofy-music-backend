import { Router } from 'express';
import {
  createTrack,
  deleteTrack,
  updateTrack
} from '../controllers/track.controller';
const trackRouter = Router();

trackRouter
  .post('/', createTrack)
  .delete('/:id', deleteTrack)
  .put('/:id', updateTrack);

export default trackRouter;
