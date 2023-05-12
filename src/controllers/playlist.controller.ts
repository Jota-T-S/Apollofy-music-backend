import { Request, Response } from 'express';
import PlaylistModel from '../models/playlist.model';
import { File } from '../interfaces/files';
import { uploadImage } from '../utils/cloudinary';
import fs from 'fs-extra';

export const getAllPlaylist = async (_req: Request, res: Response) => {
  try {
    const playlists = await PlaylistModel.find({});
    res.status(200).send({ data: playlists });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const addPlaylist = async (req: Request, res: Response) => {
  const { thumbnail } = req.files as { thumbnail?: File };

  if (!thumbnail) {
    throw new Error('Not image upload');
  }

  const { playlistName, playlistDescription } = req.body;

  try {
    if (!thumbnail) {
      throw new Error('Thumbnail is required');
    }

    const { secure_url } = await uploadImage(thumbnail.tempFilePath);
    await fs.unlink(thumbnail.tempFilePath);

    const newTrack = await PlaylistModel.create({
      name: playlistName,
      description: playlistDescription,
      thumbnail: secure_url
    });
    res.status(200).send(newTrack);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};
