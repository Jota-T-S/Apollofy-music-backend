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

export const getOnePlaylist = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const playlist = await PlaylistModel.findById(id)
      .populate('tracks')
      .lean()
      .exec();
    res.status(200).send({ data: playlist });
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
  const { trackId } = req.body;
  console.log(trackId);

  try {
    if (!trackId) throw new Error('No track id provided');

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
    // console.log(numElements);

    res.status(200).send({ data: playlists });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const deleteTrackFromPlaylist = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { songId } = req.body;

  try {
    if (!songId) throw new Error('No track id provided');

    const playlist = await PlaylistModel.findByIdAndUpdate(id, {
      $pull: { tracks: songId }
    })
      .lean()
      .exec();

    res.status(200).send({ data: playlist });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const deletePlaylist = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!id) throw new Error('No playlist id provided');

    const playlist = await PlaylistModel.findByIdAndDelete(id).lean().exec();

    res.status(200).send({ data: `${playlist?.name} deleted` });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const editPlaylist = async (req: Request, res: Response) => {
  const files: any = req.files;

  const { id } = req.params;
  console.log(id);

  const { playlistName, playlistDescription } = req.body;

  try {
    if (files) {
      const { secure_url } = await uploadImage(files!.thumbnail.tempFilePath);
      await fs.unlink(files.thumbnail.tempFilePath);

      const editPlaylist = await PlaylistModel.findByIdAndUpdate(id, {
        name: playlistName,
        description: playlistDescription,
        thumbnail: secure_url
      });

      res.status(200).send(editPlaylist);
    } else {
      const editPlaylist = await PlaylistModel.findByIdAndUpdate(id, {
        name: playlistName,
        description: playlistDescription
      });
      res.status(200).send(editPlaylist);
    }
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};
