import { Dimensions } from "react-native";

export interface Positions {
  [id: string]: number;
}

const { width } = Dimensions.get("window");
export const MARGIN = 8;
export const SIZE = width / 2 - MARGIN;
