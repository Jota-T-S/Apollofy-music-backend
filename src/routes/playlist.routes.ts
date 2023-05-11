import { Router } from 'express';
import {
  addPlaylist,
  getAllPlaylist
} from '../controllers/playlist.controller';

const playlistRouter = Router();

playlistRouter.get('/', getAllPlaylist).post('/', addPlaylist);

export default playlistRouter;
