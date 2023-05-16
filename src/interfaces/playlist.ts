interface Tracks {
  trackId: string;
  order: number;
}

interface Followed {
  userId: string;
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
  userId: string | undefined;
  tracks: Tracks[];
  followedBy: Followed[];
}
