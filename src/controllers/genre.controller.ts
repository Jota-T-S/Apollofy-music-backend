import { Request, Response } from 'express';
import GenreModel from '../models/genre.model';
import TrackModel from '../models/track.model';

export const getAllGenres = async (_req: Request, res: Response) => {
  try {
    const genres = await GenreModel.find().lean().exec();

    res.status(200).send({ status: true, data: genres });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const getTracksByGenre = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const tracks = await TrackModel.find({ genre: id }).lean().exec();
    res.status(200).send({ status: true, data: tracks });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};
