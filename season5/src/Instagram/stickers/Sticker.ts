import type { SkMatrix } from "@shopify/react-native-skia";
import type { SharedValue } from "react-native-reanimated";

export interface StickerProps {
  matrix: SkMatrix | SharedValue<SkMatrix>;
}
