import { Request, Response } from 'express';
// import PlaylistModel from '../models/playlist.model';

export const getPlaylist = async (_req: Request, res: Response) => {
  try {
    // const tracks = await PlaylistModel.find({});
    res.status(200).send({ data: 'hello' });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const addPlaylist = async (_req: Request, res: Response) => {
  try {
    // const tracks = await PlaylistModel.find({});
    res.status(200).send({ data: 'hello' });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};
