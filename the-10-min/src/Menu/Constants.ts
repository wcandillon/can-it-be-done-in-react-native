import { Platform } from "react-native";

export const alpha = Math.PI / 4;
export const perspective =
  Platform.OS === "ios" ? { perspective: 1000 } : undefined;
