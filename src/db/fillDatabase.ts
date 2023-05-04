import axios from 'axios';
import dotenv from 'dotenv';
// import { Item } from '../interfaces/spotifyData';
import { Track } from '../interfaces/track';
import TrackModel from '../models/track.model';
import { Track as TrackTest } from '../interfaces/testTrackInterface';
dotenv.config();

const fillDatabase = async () => {
  // const url = 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?market=ES&fields=items%28track%28album%28id%2Cname%2Cimages%2Crelease_date%2Cgenres%29%2Cartists%28id%2Cname%29%2Cduration_ms%2Cexplicit%2Cid%2Cname%2Cpreview_url%29%29'

  try {
    const response = await axios.get(
      'https://api.spotify.com/v1/tracks?market=ES&ids=7FbrGaHYVDmfr7KoLIZnQ7%2C1odExI7RdWc4BT515LTAwj%2C2takcwOaAZWiXQijPHIx7B',
      {
        headers: {
          Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`
        }
      }
    );

    // console.log(response.data);

    const tracks = response.data.tracks.map((item: TrackTest) => {
      const track = {
        name: item.name,
        url: item.preview_url,
        thumbnail: item.album.images[0].url,
        duration: item.duration_ms,
        albums: { id: item.album.id, name: item.album.id },
        releasedAt: item.album.release_date,
        artists: item.artists
      };

      if (track.url) {
        addIntoDB(track);
      }
      // return {
      //   name: item.name,
      //   url: item.preview_url,
      //   thumbnail: item.album.images[0].url,
      //   duration: item.duration_ms,
      //   albums: { id: item.album.id, name: item.album.id },
      //   releasedAt: item.album.release_date,
      //   artists: item.artists
      //   // name: item.track.name,
      //   // url: item.track.preview_url,
      //   // thumbnail: item.track.album.images[0].url,
      //   // duration: item.track.duration_ms,
      //   // albums: { id: item.track.album.id, name: item.track.album.id },
      //   // releasedAt: item.track.album.release_date,
      //   // artists: item.track.artists
      // };
    });

    console.log(tracks);

    // return tracks;
  } catch (error) {
    console.log(error);
  }
};

const addIntoDB = async (data: Track) => {
  try {
    await TrackModel.create(data);
    console.log('track created');
  } catch (error) {
    console.log(error);
  }
};

export default fillDatabase;
