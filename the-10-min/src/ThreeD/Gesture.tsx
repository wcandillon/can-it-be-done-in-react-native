import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  divide,
  multiply,
  set,
  useCode,
} from "react-native-reanimated";
import { usePanGestureHandler, withOffset } from "react-native-redash";

const { width, height } = Dimensions.get("window");

interface GestureProps {
  rotateX: Animated.Value<number>;
  rotateY: Animated.Value<number>;
}

const Gesture = ({ rotateX, rotateY }: GestureProps) => {
  const { gestureHandler, translation, state } = usePanGestureHandler();
  const x = withOffset(translation.x, state);
  const y = withOffset(translation.y, state);
  useCode(
    () => [
      set(rotateY, multiply(divide(x, width), 2 * Math.PI)),
      set(rotateX, multiply(divide(y, height), 2 * Math.PI)),
    ],
    [rotateX, rotateY, x, y]
  );
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};

export default Gesture;
