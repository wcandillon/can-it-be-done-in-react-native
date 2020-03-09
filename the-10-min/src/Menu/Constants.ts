import { Platform } from "react-native";

export enum State {
  OPENING,
  CLOSING,
  DRAGGING,
  SNAPPING
}
export const alpha = Math.PI / 4;
export const perspective =
  Platform.OS === "ios" ? { perspective: 1000 } : undefined;
