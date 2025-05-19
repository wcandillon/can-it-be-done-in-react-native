import {
  convertToAffineMatrix,
  convertToColumnMajor,
  Matrix4,
  multiply4,
  processTransform3d,
  translate,
} from "@shopify/react-native-skia";
import { Platform } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { type SharedValue, useDerivedValue } from "react-native-reanimated";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { type StickerDimensions } from "./stickers/types";

const multiply = (...matrices: Matrix4[]) => {
  "worklet";
  return matrices.reduce((acc, matrix) => multiply4(acc, matrix), Matrix4());
};

interface GestureHandlerProps {
  matrix: SharedValue<Matrix4>;
  size: StickerDimensions;
  debug?: boolean;
}

export const GestureHandler = ({ matrix, size }: GestureHandlerProps) => {
  const currentPosition = useSharedValue({ x: 0, y: 0 });
  const previousPosition = useSharedValue({ x: 0, y: 0 });

  const currentRotation = useSharedValue(0);
  const previousRotation = useSharedValue(0);

  const currentScale = useSharedValue(1);
  const previousScale = useSharedValue(1);

  const pan = Gesture.Pan()
    .onChange((e) => {
      currentPosition.value = {
        x: e.translationX + previousPosition.value.x,
        y: e.translationY + previousPosition.value.y,
      };
    })
    .onEnd(() => {
      previousPosition.value = currentPosition.value;
    });

  const rotate = Gesture.Rotation()
    .onChange((e) => {
      currentRotation.value = e.rotation + previousRotation.value;
    })
    .onEnd(() => {
      previousRotation.value = currentRotation.value;
    });

  const pinch = Gesture.Pinch()
    .onChange((e) => {
      currentScale.value = e.scale * previousScale.value;
    })
    .onEnd(() => {
      previousScale.value = currentScale.value;
    });

  const gesture = Gesture.Simultaneous(pan, rotate, pinch);

  const newMatrix = useDerivedValue(() => {
    return processTransform3d([
      { translateX: currentPosition.value.x },
      { translateY: currentPosition.value.y },
      { translateX: size.width / 2 },
      { translateY: size.height / 2 },
      { scale: currentScale.value },
      { rotateZ: currentRotation.value },
      { translateX: -size.width / 2 },
      { translateY: -size.height / 2 },
    ]);
  });

  useDerivedValue(() => {
    matrix.value = newMatrix.value;
  });

  const style = useAnimatedStyle(() => {
    const m = multiply(
      translate(-size.width / 2, -size.height / 2),
      newMatrix.value,
      translate(size.width / 2, size.height / 2)
    );

    const m4 = convertToColumnMajor(m);

    return {
      position: "absolute",
      width: size.width,
      height: size.height,
      top: size.y,
      left: size.x,
      transform: [
        {
          matrix:
            Platform.OS === "web"
              ? convertToAffineMatrix(m4)
              : (m4 as unknown as number[]),
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
