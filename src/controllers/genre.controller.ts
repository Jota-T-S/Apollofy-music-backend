import { Request, Response } from 'express';
import GenreModel from '../models/genre.model';

export const getAllGenres = async (_req: Request, res: Response) => {
  try {
    const genres = await GenreModel.find().lean().exec();

    res.status(200).send({ status: true, data: genres });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};
