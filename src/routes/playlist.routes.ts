import { Router } from 'express';
import {
  addPlaylist,
  addTRackToPlaylist,
  getAllPlaylists,
  getAllUserPlaylists
} from '../controllers/playlist.controller';

const playlistRouter = Router();

playlistRouter
  .get('/', getAllPlaylists)
  .post('/', addPlaylist)
  .get('/:id', getAllUserPlaylists)
  .patch('/:id', addTRackToPlaylist);

export default playlistRouter;
