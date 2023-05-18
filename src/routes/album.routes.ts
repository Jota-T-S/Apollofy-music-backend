import { Router } from 'express';
import {
  createAlbum,
  deleteAlbum,
  updateAlbum,
  getAllAlbums,
  getAlbumTracks
} from '../controllers/album.controller';
const albumRouter = Router();

albumRouter
        .post('/', createAlbum)
        .get('/', getAllAlbums)
        .get('/:id', getAlbumTracks)
        .delete('/:id', deleteAlbum)
        .put('/:id', updateAlbum)

export default albumRouter;
