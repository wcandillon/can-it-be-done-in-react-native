import React from "react";
import { StyleSheet } from "react-native";
import Animated, { useCode, set, divide, debug } from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { usePanGestureHandler, withOffset } from "react-native-redash";

import { ITEM_HEIGHT } from "./Constants";

interface GestureHandlerProps {
  value: Animated.Value<number>;
}

const GestureHandler = ({ value }: GestureHandlerProps) => {
  const { gestureHandler, translation, state } = usePanGestureHandler();
  const translateY = withOffset(translation.y, state);
  useCode(() => [set(value, divide(translateY, ITEM_HEIGHT))], []);
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};

export default GestureHandler;
