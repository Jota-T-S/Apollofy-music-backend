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
export interface Albums{
  albums: Album[];
}

export interface AlbumsTracks {
  items: AlbumTrack[];
}
export interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  type: string;
  uri: string;
  artists: Artist;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Restrictions {
  reason: string;
}

export interface AlbumSpoti {
  id: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Artist {
  id: string;
  name: string;
  genres: string[];
}


export interface AlbumTrack {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  }
  thumbnail: string;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  };
