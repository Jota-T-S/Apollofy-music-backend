import { Router } from 'express';
import {
  addPlaylist,
  addTRackToPlaylist,
  getAllPlaylists,
  getAllUserPlaylists,
  getOnePlaylist
} from '../controllers/playlist.controller';

const playlistRouter = Router();

playlistRouter
  .get('/', getAllPlaylists)
  .get('/:id', getOnePlaylist)
  .get('/all/:id', getAllUserPlaylists)
  .post('/', addPlaylist)
  .patch('/:id', addTRackToPlaylist);

export default playlistRouter;
