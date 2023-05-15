import { Router } from 'express';
import {
  createTrack,
  deleteTrack,
  getAllTrack,
  updateTrack,
  getTracksOfUser,
  getSearchResults
} from '../controllers/track.controller';

const trackRouter = Router();

trackRouter
  .get('/', getAllTrack)
  .post('/search/', getSearchResults)
  .get('/:id', getTracksOfUser)
  .post('/create/:id', createTrack)
  .delete('/:id', deleteTrack)
  .put('/:id', updateTrack);

export default trackRouter;
