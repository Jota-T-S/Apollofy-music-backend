import { Request, Response } from 'express';
import GenreModel from '../models/genre.model';
import TrackModel from '../models/track.model';

export const getAllGenres = async (_req: Request, res: Response) => {
  try {
    const genres = await GenreModel.find().lean().exec();

    res.status(200).send({ status: true, data: genres });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const getTracksByGenre = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const tracks = await TrackModel.find({ genre: id }).lean().exec();
    res.status(200).send({ status: true, data: tracks });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const getGenreStats = async (_req: Request, res: Response) => {
  try {
    const genreStats = await TrackModel.aggregate([
      {
        $group: {
          _id: "$genre",
          totalPlays: {
            $sum: {
              $cond: [
                { $in: [{ $type: "$playCount" }, ["int", "long", "double"]] },
                "$playCount",
                0
              ]
            }
          },
          totalDuration: {
            $sum: {
              $cond: [
                { $in: [{ $type: "$duration" }, ["int", "long", "double"]] },
                { $multiply: ["$duration", { $ifNull: ["$playCount", 0] }] },
                0
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: "genres", 
          localField: "_id",
          foreignField: "_id",
          as: "genreDetails"
        }
      },
      {
        $unwind: "$genreDetails"
      },
      {
        $project: {
          _id: 0, 
          genre: "$genreDetails.name",
          totalPlays: 1, 
          totalDuration: { $divide: ["$totalDuration", 60000] } 
        }
      },
      {
        $sort: { totalDuration: -1 } 
      }
    ]);

    return res.status(200).json(genreStats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

