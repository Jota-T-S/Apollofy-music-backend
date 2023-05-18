import { Router } from 'express';
import {
  createTrack,
  deleteTrack,
  getAllTrack,
  getMostPlayed,
  updateTrack,
  getTracksOfUser,
  incrementPlayCount,
  getSearchResults
} from '../controllers/track.controller';

const trackRouter = Router();

trackRouter
  .get('/', getAllTrack)
  .get("/mostPlayed", getMostPlayed)
  .post('/search/', getSearchResults)
  .post('/create/:id', createTrack)
  .get('/:id', getTracksOfUser)
  .post("/:id/plays", incrementPlayCount)
  .delete('/:trackId/:id', deleteTrack)
  .put('/:id', updateTrack);
  

export default trackRouter;
