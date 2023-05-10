import { Router } from 'express';
import { addPlaylist, getPlaylist } from '../controllers/playlist.controller';

const playlistRouter = Router();

playlistRouter.get('/', getPlaylist);
playlistRouter.post('/', addPlaylist);

export default playlistRouter;
