import { Dimensions } from "react-native";
import { Vector } from "react-native-redash";

const { width } = Dimensions.get("window");
export const SIZE = width / 8;

type Col = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
type Row = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

export const toPosition = (to: string) => {
  "worklet";
  const [col, row] = to.split("");
  if (!col || !row) {
    throw new Error("Invalid notation: " + to);
  }
  const indexes = {
    x: col.charCodeAt(0) - "a".charCodeAt(0),
    y: parseInt(row, 10) - 1,
  };
  return {
    x: indexes.x * SIZE,
    y: 7 * SIZE - indexes.y * SIZE,
  };
};

export const fromPosition = ({ x, y }: Vector) => {
  "worklet";
  const row = String.fromCharCode(97 + Math.round(x / SIZE));
  const col = `${8 - Math.round(y / SIZE)}`;
  return `${row}${col}`;
};
