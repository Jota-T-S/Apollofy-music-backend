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
  .post('/create/:id', createTrack)
  .get('/:id', getTracksOfUser)
  .delete('/:trackId/:id', deleteTrack)
  .put('/:id', updateTrack);

export default trackRouter;
