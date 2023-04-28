import { Router } from 'express';
import {
	getAlbum,
	createAlbum,
	deleteAlbum,
	updateAlbum
} from '../controllers/album.controller';
const albumRouter = Router();

albumRouter.get('/:id', getAlbum);
albumRouter.post('/', createAlbum);
albumRouter.delete('/:id', deleteAlbum);
albumRouter.put('/:id', updateAlbum);

export default albumRouter;
