import { Router } from 'express';
import {
  createTrack,
  deleteTrack,
  getAllTrack,
  updateTrack,
  getTracksOfUser,
  getSearchResults,
  getOneTrack
} from '../controllers/track.controller';

const trackRouter = Router();

trackRouter
  .get('/', getAllTrack)
  .post('/search/', getSearchResults)
  .post('/create/:id', createTrack)
  .get('/:id', getTracksOfUser)
  .get('/getOneTrack/:id', getOneTrack)
  .delete('/:trackId/:id', deleteTrack)
  .put('/:id', updateTrack);

export default trackRouter;
