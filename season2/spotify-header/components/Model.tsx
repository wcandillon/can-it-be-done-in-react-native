import { Dimensions } from "react-native";
import { Constants } from "expo";

const {height} = Dimensions.get("window");
const φ = (1 + Math.sqrt(5)) / 2;

export const MIN_HEADER_HEIGHT = 64 + Constants.statusBarHeight;
export const MAX_HEADER_HEIGHT = height * (1 - 1 / φ);

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
