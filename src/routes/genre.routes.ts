import { Router } from 'express';
import {
  getAllGenres,
  getTracksByGenre,
  getGenreStats
} from '../controllers/genre.controller';

const genreRouter = Router();


genreRouter
.get('/', getAllGenres)
.get('/genreStats', getGenreStats)
.get('/:id', getTracksByGenre);


export default genreRouter;
