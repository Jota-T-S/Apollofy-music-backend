import TrackModel from '../models/track.model';
import { Track } from '../interfaces/track';
import { Request, Response } from 'express';
import { uploadImage, uploadTrack } from '../utils/cloudinary';
import fs from 'fs-extra';

export const getAllTrack = async (_req: Request, res: Response) => {
  try {
    const tracks = await TrackModel.find({}).lean().exec();
    res.status(200).send({ status: true, data: tracks });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const createTrack = async (req: Request, res: Response) => {
  const { url, thumbnail }: any = req.files;
  const {
    name,
    rating,
    popularity,
    duration,
    color,
    genre,
    albums,
    likedBy
  }: Track = req.body;

  try {
    if (!req.files?.thumbnail) {
      throw new Error('Thumbnail is required');
    }
    const resultImage = await uploadImage(thumbnail.tempFilePath);
    const newTrackThumbnail = {
      // public_id: resultImage.public_id,
      secure_url: resultImage.secure_url
    };

    await fs.unlink(thumbnail.tempFilePath);

    if (!req.files?.url) {
      throw new Error('Url is required');
    }

    const resultUrl = await uploadTrack(url.tempFilePath);
    const newTrackUrl = {
      // public_id: resultUrl.public_id,
      secure_url: resultUrl.secure_url
    };
    await fs.unlink(url.tempFilePath);

    const newTrack = await TrackModel.create({
      name,
      rating,
      url: newTrackUrl,
      popularity,
      thumbnail: newTrackThumbnail,
      duration,
      color,
      genre,
      albums,
      likedBy
    });

    res.status(200).send(newTrack);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const deleteTrack = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { trackName } = req.body;
  try {
    const track = await TrackModel.findByIdAndDelete(id).lean().exec();
    res.status(200).send({
      status: true,
      message: `${trackName} has been deleted`,
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
