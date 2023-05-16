import { Router } from 'express';
import {
  getAlbum,
  createAlbum,
  deleteAlbum,
  updateAlbum,
  getAllAlbums
} from '../controllers/album.controller';
const albumRouter = Router();

albumRouter
        .post('/', createAlbum)
        .get('/', getAllAlbums)
        .get('/:id', getAlbum)
        .delete('/:id', deleteAlbum)
        .put('/:id', updateAlbum)

export default albumRouter;
