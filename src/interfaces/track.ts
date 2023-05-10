interface GenreTrack {
  id: string;
  name: string;
}

interface AlbumsTrack {
  id: string;
  name: string;
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
  rating?: number;
  url?: string | null;
  popularity?: string;
  thumbnail?: string;
  duration: number;
  color?: string;
  genre?: GenreTrack;
  albums: AlbumsTrack;
  likedBy?: LikedByTrack;
  releasedAt: Date;
  artists: Artist[];
}
