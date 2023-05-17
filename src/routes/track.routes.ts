import { Router } from 'express';
import {
  createTrack,
  deleteTrack,
  getAllTrack,
  updateTrack,
  getTracksOfUser,
  getOneTrack
} from '../controllers/track.controller';

const trackRouter = Router();

trackRouter
  .get('/', getAllTrack)
  .post('/create/:id', createTrack)
  .get('/:id', getTracksOfUser)
  .get('/getOneTrack/:id', getOneTrack)
  .delete('/:id', deleteTrack)
  .put('/:id', updateTrack);

export default trackRouter;
