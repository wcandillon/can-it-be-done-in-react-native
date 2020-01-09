import { Dimensions } from "react-native";
import { StyleGuide } from "../components";

const { width } = Dimensions.get("window");

export const { PI } = Math;
export const TAU = 2 * PI;
export const RADIUS = width / 2 - 16;
export const STROKE_WIDTH = 100;
export const COLOR_FG = StyleGuide.palette.primary;
export const COLOR_BG = "white";
