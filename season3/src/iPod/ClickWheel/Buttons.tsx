import React, { ReactNode } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { Navigation } from "../IPodNavigator";

export enum Command {
  UNDETERMINED,
  CENTER,
  LEFT,
  RIGHT,
  TOP,
  BOTTOM
}

const { width } = Dimensions.get("window");
export const size = 0.75 * (width - 32);
const BUTTON_SIZE = size / 3;
const TOP = {
  x: BUTTON_SIZE,
  y: 0
};
const BOTTOM = {
  x: BUTTON_SIZE,
  y: BUTTON_SIZE * 2
};
const LEFT = {
  x: 0,
  y: BUTTON_SIZE
};
const CENTER = {
  x: BUTTON_SIZE,
  y: BUTTON_SIZE
};
const RIGHT = {
  x: BUTTON_SIZE * 2,
  y: BUTTON_SIZE
};

interface ButtonsProps {
  children: ReactNode;
}

export default ({ children }: ButtonsProps) => {
  return null;
};
