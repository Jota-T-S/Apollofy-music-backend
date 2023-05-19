import { Request, Response } from 'express';
import fs from 'fs-extra';
import { uploadImage, uploadTrack } from '../utils/cloudinary';
import { Track } from '../interfaces/track';
import TrackModel from '../models/track.model';
import UserModel from '../models/user.model';
import PlaylistModel from '../models/playlist.model';
import GenreModel from '../models/genre.model';
import AlbumModel from '../models/album.model';
import mongoose from 'mongoose';

export const getAllTrack = async (_req: Request, res: Response) => {
  try {
    const tracks = await TrackModel.find({}).lean().exec();
    res.status(200).send({ status: true, data: tracks });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const createTrack = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { url, thumbnail }: any = req.files;
  const { name, duration, genre, albums }: Track = req.body;

  try {
    if (!req.files?.thumbnail) {
      throw new Error('Thumbnail is required');
    }
    const resultImage = await uploadImage(thumbnail.tempFilePath);
    await fs.unlink(thumbnail.tempFilePath);
    if (!req.files?.url) {
      throw new Error('Url is required');
    }
    const resultUrl = await uploadTrack(url.tempFilePath);
    await fs.unlink(url.tempFilePath);

    const genreTrack = await GenreModel.find({ name: genre });

    const newTrack = await TrackModel.create({
      name,
      url: resultUrl.secure_url,
      thumbnail: resultImage.secure_url,
      duration,
      genre: genreTrack[0]._id,
      albums: albums!.id,
      userId: id
    });

    await UserModel.findByIdAndUpdate(id, {
      $push: { tracks: newTrack.id }
    });

    res.status(200).send(newTrack);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const deleteTrack = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { trackId, id } = req.params;

  try {
    const track: any = await TrackModel.findById(trackId).lean().exec();

    if (track.userId.toString() !== id) {
      return res
        .status(403)
        .send({ status: false, message: 'Unauthorized access' });
    }

    await TrackModel.findByIdAndDelete(trackId).exec();

    await UserModel.findByIdAndUpdate(id, { $pull: { tracks: trackId } });

    res.status(200).send({
      status: true,
      message: `${track.name} has been deleted`,
      data: track
    });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const updateTrack = async (req: Request, res: Response) => {
  const id = req.params.id;
  const props = req.body;

  try {
    await TrackModel.findByIdAndUpdate(id, props).lean().exec();

    const updatedProps = Object.entries(props)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    res.status(200).send({ message: `Track ${id} modified: ${updatedProps}` });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const getTracksOfUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const tracks = await TrackModel.find({ userId: id });
    res.status(200).send({ data: tracks });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const getSearchResults = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { inputValue } = req.body;
  try {
    // find tracks
    const tracks = await TrackModel.find({
      name: { $regex: inputValue, $options: 'i' }
    })
      .lean()
      .exec();
    // find playlists
    const playlists = await PlaylistModel.find({
      name: { $regex: inputValue, $options: 'i' }
    })
      .lean()
      .exec();

    // find albums
    const albums = await AlbumModel.find({
      title: { $regex: inputValue, $options: 'i' }
    });

    res.status(200).send({ tracks, playlists, albums });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const incrementPlayCount = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id as any)) {
      return res.status(400).json({ message: 'Invalid track ID' });
    }

    const track = await TrackModel.findByIdAndUpdate(
      id,
      { $inc: { playCount: 1 } },
      { new: true, runValidators: true }
    );

    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }

    return res.status(200).json({ message: 'Incremented play count' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getMostPlayed = async (_req: Request, res: Response) => {
  try {
    const topTracks = await TrackModel.find().sort({ playCount: -1 }).limit(30);

    const topTracksWithDuration = topTracks.map((track) => {
      const trackObject: any = track.toObject();
      return {
        ...trackObject,
        totalMinutesPlayed: (
          (trackObject.playCount * trackObject.duration!) /
          60000
        ).toString()
      };
    });
    return res.status(200).json(topTracksWithDuration);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getOneTrack = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const track = await TrackModel.findById(id).lean().exec();
    res.status(200).send(track);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};
