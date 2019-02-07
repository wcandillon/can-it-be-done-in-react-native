// @flow
import type { ImageSourcePropType } from "react-native/Libraries/Image/ImageSourcePropType";

export type Story = {
  id: string,
  source: ImageSourcePropType,
  user: string,
  avatar: ImageSourcePropType,
};

export type Position = {
  x: number,
  y: number,
  width: number,
  height: number,
};
