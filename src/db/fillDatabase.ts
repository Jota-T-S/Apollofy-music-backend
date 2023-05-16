import axios from 'axios';
import { AlbumTrack, AlbumsTracks} from '../interfaces/spotifyData';
// import { Albums } from '../interfaces/spotifyData';
// import { Album } from '../interfaces/album';
// import { Album } from '../interfaces/album';


import { Track } from '../interfaces/track';
import TrackModel from '../models/track.model';
import AlbumModel from '../models/album.model';

const fillDatabase = async () => {

  // ! Songs URL
  // const url =
  //   'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?market=ES&fields=items%28track%28album%28id%2Cname%2Cimages%2Crelease_date%2Cgenres%29%2Cartists%28id%2Cname%29%2Cduration_ms%2Cexplicit%2Cid%2Cname%2Cpreview_url%29%29';

  // ! Album URL
  // const url = 'https://api.spotify.com/v1/albums?ids=2n0ez0hSIrItwkVxDKXHlO,7wGLeeJt18EBjc181FP2cM,7ceAracLVCjB7bhicRoPGb,7qemUq4n71awwVPOaX7jw4,7hhxms8KCwlQCWffIJpN9b,33pt9HBdGlAbRGBHQgsZsU,3cQO7jp5S9qLBoIVtbkSM1,6twKQ0EsUJHVlAr6XBylrj,0R3iUk31drnPKGCdb35Cbw'

  // ! Album Songs URL
  const albumId = '33pt9HBdGlAbRGBHQgsZsU'
  const url = `https://api.spotify.com/v1/albums/${albumId}/tracks`

  try {

    // ! Add Album songs to DB
     const response = await axios.get<AlbumsTracks>(url, {
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`
      }
    });

    const album = await AlbumModel.findOne({ id: albumId });
    const albumImage = album?.thumbnail;
    // const id = album?.id;
    // const title = album?.title;
    const year = album?.year;

    response.data.items.map((item:AlbumTrack) => {
      const track = {
        trackId: item.id,
        name: item.name,
        url: item.preview_url,
        thumbnail: albumImage,
        duration: item.duration_ms,
        releasedAt: year,
        artists: item.artists
      };

      if (track.url) {
        // console.log(track, albumId)
        addIntoDB(track, albumId);
        return;
      }
      console.log('url no exits');
    });
    // ! Add songs to DB
    // const response = await axios.get<Songs>(url, {
    //   headers: {
    //     Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`
    //   }
    // });

    // const tracks = response.data.items.map((item) => {
    //   const track = {
    //     trackId: item.track.id,
    //     name: item.track.name,
    //     url: item.track.preview_url,
    //     thumbnail: item.track.album.images[0].url,
    //     duration: item.track.duration_ms,
    //     albums: { id: item.track.album.id, name: item.track.album.id },
    //     releasedAt: item.track.album.release_date,
    //     artists: item.track.artists
    //   };

    //   if (track.url) {
    //     addIntoDB(track);
    //     return;
    //   }
    //   console.log('url no exits');
    // });
     
    // ! Add albums to DB
    // const response = await axios.get<Albums>(url, {
    //   headers: {
    //     Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`
    //   },
    // });

    // response.data.albums.map((item) => {
    //   const album: Album = {
    //     id: item.id,
    //     year: item.release_date,
    //     totalTracks: item.total_tracks,
    //     thumbnail: item.images[0].url,
    //     title: item.name,
    //     url: item.external_urls.spotify,
    //     artist_name: item.artists.name,
    //   };

    //   addAlbumsIntoDB(album);
    // })

  } catch (error) {
    console.log(error);
  }
};

// ! Add albums to DB Function

// const addAlbumsIntoDB = async (data: Album) => {
//   try{

//     const album = await AlbumModel.findOne({ id: data.id });

//     if (album){
//       return console.log('Album exists');
//     }

//     await AlbumModel.create(data);
//     console.log('Album created');

//   }catch(error){
//     console.log(error)
//   }
// }

// ! Add songs to DB Function w/ Album reference
const addIntoDB = async (data: Track, albumId : string) => {
  try {
    const song = await TrackModel.findOne({ trackId: data.trackId });

    if (song) {
      return console.log('Song exists');
    }

    const track = await TrackModel.create(data);
    await AlbumModel.findOneAndUpdate({id: albumId}, 
      {$push : {tracks : track._id}
    })
    console.log('track created');
  } catch (error) {
    console.log(error);
  }
};

export default fillDatabase;
