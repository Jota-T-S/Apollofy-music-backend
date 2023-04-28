import AlbumModel from '../models/album.model';
import { Album } from '../interfaces/album';
import { Request, Response } from 'express';

export const getAlbum = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const album = await AlbumModel.findById(id).lean().exec();

    if (album) {
      res.status(200).json(album);
    } else if (!album) {
      res.status(404).send({ message: `Album with ID ${id} not found` });
    }
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const createAlbum = async (req: Request, res: Response) => {
  const { title, year, thumbnail, totalTracks, userId, likedBy }: Album =
    req.body;
  try {
    const newAlbum = await AlbumModel.create({
      title,
      year,
      thumbnail,
      totalTracks,
      userId,
      likedBy
    });
    res.status(200).send(newAlbum);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const deleteAlbum = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title } = req.body;
  try {
    const album = await AlbumModel.findByIdAndDelete(id).lean().exec();
    res.status(200).send({
      status: true,
      message: `${title} has been deleted`,
      data: album
    });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const updateAlbum = async (req: Request, res: Response) => {
  const id = req.params.id;
  const props = req.body;

  try {
    await AlbumModel.findByIdAndUpdate(id, props).lean().exec();

    const updatedProps = Object.entries(props)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    res.status(200).send({ message: `Album ${id} modified: ${updatedProps}` });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};
