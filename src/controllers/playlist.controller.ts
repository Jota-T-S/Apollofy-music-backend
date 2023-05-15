import { Request, Response } from 'express';
import PlaylistModel from '../models/playlist.model';
import { File } from '../interfaces/files';
import { uploadImage } from '../utils/cloudinary';
import fs from 'fs-extra';

export const getAllPlaylists = async (_req: Request, res: Response) => {
  try {
    const playlists = await PlaylistModel.find({});
    res.status(200).send({ data: playlists });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const getAllUserPlaylists = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const playlists = await PlaylistModel.find({ userId: id })
      .populate('userId')
      .lean()
      .exec();
    res.status(200).send({ data: playlists });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const addPlaylist = async (req: Request, res: Response) => {
  const { thumbnail } = req.files as { thumbnail?: File };

  const { playlistName, playlistDescription, userId } = req.body;

  try {
    if (!thumbnail) {
      throw new Error('Not image upload');
    }

    const { secure_url } = await uploadImage(thumbnail.tempFilePath);
    await fs.unlink(thumbnail.tempFilePath);

    const newPlaylist = await PlaylistModel.create({
      name: playlistName,
      description: playlistDescription,
      thumbnail: secure_url,
      userId
    });
    res.status(200).send(newPlaylist);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const addTRackToPlaylist = async (req: Request, res: Response) => {
  const { id } = req.params;
  const trackId = req.body;

  try {
    const playlists = await PlaylistModel.findByIdAndUpdate(id, {
      $push: { tracks: trackId }
    })
      .lean()
      .exec();

    //----- another way to do it the same ---------
    // const playlists = await PlaylistModel.findById(id);
    // if (!playlists) throw new Error('No playlists');
    // playlists.tracks.push(trackId);
    // await playlists.save();

    res.status(200).send({ data: playlists });
    console.log(playlists);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};
