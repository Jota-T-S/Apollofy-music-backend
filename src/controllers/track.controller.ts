import TrackModel from "../models/track.model";
import { Track } from "../interfaces/track";
import { Request, Response } from "express";

export const createTrack = async (req: Request, res: Response) => {
    const { songName, rating, url, popularity, thumbnail, duration, color, genre, albums, likedBy }: Track =
        req.body;
    try {
        const newTrack = await TrackModel.create({
            songName,
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
        res.status(500).send({ message: (error as Error).message })
    }
};