import { Request, Response } from 'express';
import PlaylistModel from '../models/playlist.model';

export const getAllPlaylist = async (_req: Request, res: Response) => {
  try {
    const playlists = await PlaylistModel.find({});
    res.status(200).send({ data: playlists });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const addPlaylist = async (req: Request, res: Response) => {
  const { playlistName, playlistDescription } = req.body;

  try {
    const newTrack = await PlaylistModel.create({
      name: playlistName,
      description: playlistDescription
    });
    res.status(200).send(newTrack);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};
