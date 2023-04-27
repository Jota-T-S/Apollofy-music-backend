import { Router } from 'express';
import { createTrack } from '../controllers/track.controller'
const trackRouter = Router();

trackRouter.post('/create', createTrack);

export default trackRouter;