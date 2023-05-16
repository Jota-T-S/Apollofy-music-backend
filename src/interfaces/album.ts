interface LikedByAlbum {
  userId: string;
}
export interface Album {
  title: string;
  year: string;
  thumbnail: string;
  artist_name: string;
  totalTracks: number;
  url: string;
  id: string;
  userId?: string;
  likedBy?: LikedByAlbum[];
}
