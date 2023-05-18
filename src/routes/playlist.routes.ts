import { Router } from 'express';
import {
 addPlaylist,
 followPlaylist,
 addTRackToPlaylist,
 getAllPlaylists,
 unfollowPlaylist,
 getFollowedPlaylists,
 getAllUserPlaylists,
 getOnePlaylist
} from '../controllers/playlist.controller';


const playlistRouter = Router();


playlistRouter
 .get('/', getAllPlaylists)
 .post('/followPlaylist/:id', followPlaylist)
 .get('/:id', getOnePlaylist)
 .post('/unfollowPlaylist/:id', unfollowPlaylist)
 .get('/all/:id', getAllUserPlaylists)
 .get('/getFollowedPlaylists/:id', getFollowedPlaylists)
 .post('/', addPlaylist)
 .patch('/:id', addTRackToPlaylist);


export default playlistRouter;
