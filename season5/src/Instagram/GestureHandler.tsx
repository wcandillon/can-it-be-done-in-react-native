import {
  Skia,
  type SkMatrix,
  type SkSize,
  vec,
} from "@shopify/react-native-skia";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { rotateZ, scale, toM4, translate } from "./MatrixHelpers";
interface GestureHandlerProps {
  matrix: SharedValue<SkMatrix>;
  size: SkSize;
  debug?: boolean;
}

export const GestureHandler = ({ matrix, size }: GestureHandlerProps) => {
  const pivot = useSharedValue(Skia.Point(0, 0));
  const offset = useSharedValue(Skia.Matrix());
  const pan = Gesture.Pan().onChange((event) => {
    matrix.value = translate(matrix.value, event.changeX, event.changeY);
  });
  const pinch = Gesture.Pinch()
    .onBegin((event) => {
      offset.value = matrix.value;
      pivot.value = vec(event.focalX, event.focalY);
    })
    .onChange((event) => {
      matrix.value = scale(offset.value, event.scale, pivot.value);
    });

  const rotate = Gesture.Rotation()
    .onBegin((event) => {
      offset.value = matrix.value;
      pivot.value = vec(event.anchorX, event.anchorY);
    })
    .onChange((event) => {
      matrix.value = rotateZ(offset.value, event.rotation, pivot.value);
    });
  const gesture = Gesture.Race(pan, pinch, rotate);
  const style = useAnimatedStyle(() => ({
    position: "absolute",
    width: size.width,
    height: size.height,
    top: 0,
    left: 0,
    transform: [
      {
        translateX: -size.width / 2,
      },
      {
        translateY: -size.height / 2,
      },
      { matrix: toM4(matrix.value) },
      {
        translateX: size.width / 2,
      },
      {
        translateY: size.height / 2,
      },
    ],
  }));
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={style} />
    </GestureDetector>
  );
};
