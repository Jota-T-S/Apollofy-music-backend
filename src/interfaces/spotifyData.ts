export interface Songs {
  items: Item[];
}

export interface Item {
  track: Track;
}

export interface Track {
  album: Album;
  artists: Artist[];
  duration_ms: number;
  explicit: boolean;
  id: string;
  name: string;
  preview_url: null | string;
}

export interface Album {
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Artist {
  id: string;
  name: string;
}
