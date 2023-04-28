interface LikedByAlbum {
	userId: string;
}
export interface Album {
	title: string;
	year: number;
	thumbnail: string;
	totalTracks: number;
	userId: string;
	likedBy: LikedByAlbum[];
}
