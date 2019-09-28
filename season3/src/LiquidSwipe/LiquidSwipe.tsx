import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { PanGestureHandler, State } from "react-native-gesture-handler";
import { onGestureEvent, withOffset } from "react-native-redash";
import Weave from "./Weave";
import { sideWidth, waveHorRadius, waveVertRadius } from "./WeaveHelpers";

const { height, width } = Dimensions.get("window");
const {
  Value,
  cond,
  lessOrEq,
  greaterOrEq,
  add,
  divide,
  sub,
  multiply,
  interpolate,
  block,
  exp,
  cos,
  useCode,
  debug
} = Animated;

export default () => {
  const translationX = new Value(0);
  const translationY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({
    translationX,
    translationY,
    state
  });
  const translateX = withOffset(translationX, state);
  const translateY = withOffset(translationY, state);
  const progress = interpolate(translateX, {
    inputRange: [-width, 0],
    outputRange: [1, 0]
  });
  const horRadius = waveHorRadius(progress);
  const vertRadius = waveVertRadius(progress);
  return (
    <View style={{ flex: 1 }}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View>
          <Weave
            centerY={translateY}
            sideWidth={sideWidth(progress)}
            {...{ horRadius, vertRadius }}
          />
        </Animated.View>
      </PanGestureHandler>
      <Animated.View
        pointerEvents="none"
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [{ translateX }],
          backgroundColor: "rgba(100, 200, 300, 0.3)"
        }}
      />
    </View>
  );
};
