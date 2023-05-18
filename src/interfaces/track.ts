interface GenreTrack {
  id: string;
  name: string;
  color: string;
  image: string;
}

interface AlbumsTrack {
  id?: string | undefined;
  name?: string | undefined;
}

interface LikedByTrack {
  userId: string;
}

interface Artist {
  id: string;
  name: string;
}

export interface Track {
  trackId: string;
  name: string;
  id?: string;
  rating?: number;
  url?: string | null;
  popularity?: number;
  thumbnail: string | undefined;
  duration: number;
  color?: string;
  genre?: GenreTrack;
  albums?: AlbumsTrack;
  likedBy?: LikedByTrack;
  releasedAt: Date | string | undefined;
  artists: Artist[]; 
  playCount?: number;
}
