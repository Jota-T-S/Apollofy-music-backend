interface Tracks {
  trackId: string;
  order: number;
}

export interface Playlist {
  name: string;
  collaborative: boolean;
  description: string;
  primaryColor: string;
  cover: string;
  thumbnail: string;
  publicAccessible: boolean;
  numberSongs: number;
  followers: number;
  rating: number;
  userId: string;
  tracks: Tracks[];
  followedBy: [userId: string];
}
