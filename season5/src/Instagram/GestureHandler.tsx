import {
  convertToAffineMatrix,
  convertToColumnMajor,
  Matrix4,
  multiply4,
  rotateZ,
  scale,
  translate,
} from "@shopify/react-native-skia";
import type { SkSize } from "@shopify/react-native-skia";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Platform } from "react-native";

interface GestureHandlerProps {
  matrix: SharedValue<Matrix4>;
  size: SkSize;
  debug?: boolean;
}

export const GestureHandler = ({ matrix, size }: GestureHandlerProps) => {
  const origin = useSharedValue({ x: 0, y: 0 });
  const offset = useSharedValue(Matrix4());

  const pan = Gesture.Pan().onChange((e) => {
    matrix.value = multiply4(translate(e.changeX, e.changeY), matrix.value);
  });

  const rotate = Gesture.Rotation()
    .onBegin((e) => {
      origin.value = { x: e.anchorX, y: e.anchorY };
      offset.value = matrix.value;
    })
    .onChange((e) => {
      matrix.value = multiply4(offset.value, rotateZ(e.rotation, origin.value));
    });

  const pinch = Gesture.Pinch()
    .onBegin((e) => {
      origin.value = { x: e.focalX, y: e.focalY };
      offset.value = matrix.value;
    })
    .onChange((e) => {
      matrix.value = multiply4(
        offset.value,
        scale(e.scale, e.scale, 1, origin.value)
      );
    });

  const gesture = Gesture.Race(pan, pinch, rotate);
  const style = useAnimatedStyle(() => {
    const m4 = convertToColumnMajor(matrix.value);
    return {
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
        {
          matrix:
            Platform.OS === "web"
              ? convertToAffineMatrix(m4)
              : (m4 as unknown as number[]),
        },
        {
          translateX: size.width / 2,
        },
        {
          translateY: size.height / 2,
        },
      ],
    };
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={style} />
    </GestureDetector>
  );
};
