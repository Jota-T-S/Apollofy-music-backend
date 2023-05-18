import { Router } from 'express';

import { getAllRols, getUsersByRol } from '../controllers/rol.controller';

const rolRouter = Router();

rolRouter.get('/', getAllRols).get('/:id', getUsersByRol);

export default rolRouter;
