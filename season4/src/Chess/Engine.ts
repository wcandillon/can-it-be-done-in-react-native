import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
export const SIZE = width / 8;

type COL = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
type ROW = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
type Position = `${COL}${ROW}`;
