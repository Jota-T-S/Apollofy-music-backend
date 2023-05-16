import { Router } from 'express';
import {
  getAllGenres,
  getTracksByGenre
} from '../controllers/genre.controller';

const genreRouter = Router();

genreRouter.get('/', getAllGenres).get('/:id', getTracksByGenre);

export default genreRouter;
