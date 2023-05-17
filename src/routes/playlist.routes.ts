import { Router } from 'express';
import {
  addPlaylist,
  addTRackToPlaylist,
  deletePlaylist,
  deleteTrackFromPlaylist,
  editPlaylist,
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
  .patch('/track/:id', addTRackToPlaylist)
  .patch('/:id', editPlaylist)
  .delete('/:id', deletePlaylist)
  .delete('/track/:id', deleteTrackFromPlaylist);

export default playlistRouter;
