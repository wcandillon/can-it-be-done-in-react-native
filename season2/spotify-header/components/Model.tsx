export interface Track {
  name: string;
  artist?: string;
}

export interface Album {
  name: string;
  artist: string;
  release: number;
  cover: number | number[];
  tracks: Track[];
}
