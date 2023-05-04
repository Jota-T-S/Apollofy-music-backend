import axios from 'axios';
import { Item } from '../interfaces/spotifyData';
import { Track } from '../interfaces/track';
import TrackModel from '../models/track.model';

const fillDatabase = async () => {
  const url =
    'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?market=ES&fields=items%28track%28album%28id%2Cname%2Cimages%2Crelease_date%2Cgenres%29%2Cartists%28id%2Cname%29%2Cduration_ms%2Cexplicit%2Cid%2Cname%2Cpreview_url%29%29';

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`
      }
    });

    const tracks = response.data.items.map((item: Item) => {
      const track = {
        trackId: item.track.id,
        name: item.track.name,
        url: item.track.preview_url,
        thumbnail: item.track.album.images[0].url,
        duration: item.track.duration_ms,
        albums: { id: item.track.album.id, name: item.track.album.id },
        releasedAt: item.track.album.release_date,
        artists: item.track.artists
      };

      if (track.url) {
        addIntoDB(track);
        return;
      }
      console.log('url no exits');
    });

    console.log(tracks);
  } catch (error) {
    console.log(error);
  }
};

const addIntoDB = async (data: Track) => {
  try {
    const song = await TrackModel.findOne({ trackId: data.trackId });

    if (song) {
      return console.log('Song exists');
    }

    await TrackModel.create(data);
    console.log('track created');
  } catch (error) {
    console.log(error);
  }
};

export default fillDatabase;
