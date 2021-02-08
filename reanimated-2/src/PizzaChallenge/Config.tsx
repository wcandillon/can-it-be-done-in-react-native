import { Dimensions } from "react-native";

const {width} = Dimensions.get("window");
export const PIZZA_SIZE = width - 64;
export const BREAD_PADDING = PIZZA_SIZE * 0.03;
export const INGREDIENT_SCALE = 0.15;
export const MIN_RADIUS = PIZZA_SIZE/2 * 0.3;
export const MAX_RADIUS = PIZZA_SIZE/2 * 0.6;