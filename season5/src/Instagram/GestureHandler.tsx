import type { SkMatrix, SkSize } from "@shopify/react-native-skia";
import type { SharedValue } from "react-native-reanimated";
interface GestureHandlerProps {
  matrix: SharedValue<SkMatrix>;
  size: SkSize;
  debug?: boolean;
}

export const GestureHandler = ({}: GestureHandlerProps) => {
  return null;
};
