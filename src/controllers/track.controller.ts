import TrackModel from '../models/track.model';
import { Track } from '../interfaces/track';
import { Request, Response } from 'express';

export const createTrack = async (req: Request, res: Response) => {
  const {
    trackName,
    rating,
    url,
    popularity,
    thumbnail,
    duration,
    color,
    genre,
    albums,
    likedBy
  }: Track = req.body;
  try {
    const newTrack = await TrackModel.create({
      trackName,
      rating,
      url,
      popularity,
      thumbnail,
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
