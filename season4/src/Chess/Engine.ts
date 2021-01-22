import { Dimensions } from "react-native";
import { Vector } from "react-native-redash";

const { width } = Dimensions.get("window");
export const SIZE = width / 8;

type Col = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
type Row = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

export const toPosition = (col: Col, row: Row) => ({
  x: (col.charCodeAt(0) - 97) * SIZE,
  y: (8 - parseInt(row, 10)) * SIZE,
});

export const fromPosition = ({ x, y }: Vector) => {
  const row = 97 + String.fromCharCode(Math.round(x / SIZE));
  const col = `${Math.round(y / SIZE) + 1}`;
  return `${row}${col}`;
};
