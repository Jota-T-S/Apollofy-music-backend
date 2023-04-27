interface GenreTrack {
    id: string,
    name: string
}

interface AlbumsTrack {
    albumId: string
}

interface LikedByTrack {
    userId: string
}
export interface Track {
    songName: string,
    rating: number,
    url?: string,
    popularity?: string,
    thumbnail?: string,
    duration?: number,
    color?: string,
    genre: GenreTrack,
    albums: AlbumsTrack,
    likedBy: LikedByTrack,

}