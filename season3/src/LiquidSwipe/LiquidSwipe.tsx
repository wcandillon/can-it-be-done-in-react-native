import React from "react";
import { Dimensions } from "react-native";
import Animated from "react-native-reanimated";

import { PanGestureHandler, State } from "react-native-gesture-handler";
import { onGestureEvent, withSpring } from "react-native-redash";
import Weave from "./Weave";
import {
  initialWaveCenter,
  sideWidth,
  waveHorRadius,
  waveHorRadiuswaveHorRadiusBack,
  waveVertRadius
} from "./WeaveHelpers";

const { width } = Dimensions.get("window");
const maxChange = width * (1.0 / 0.45);
const {
  Value,
  interpolate,
  greaterOrEq,
  cond,
  useCode,
  debug,
  min,
  multiply,
  divide,
  max
} = Animated;

export default () => {
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const offsetY = new Value(initialWaveCenter);
  const gestureHandler = onGestureEvent({
    translationX,
    translationY,
    velocityX,
    velocityY,
    state
  });
  const translateX = withSpring({
    value: translationX,
    velocity: velocityX,
    state,
    snapPoints: [-width, 0]
  });
  const translateY = withSpring({
    value: translationY,
    velocity: velocityY,
    state,
    snapPoints: [initialWaveCenter],
    offset: offsetY
  });
  const progress = min(1, max(0, divide(multiply(-1, translateX), maxChange)));
  const horRadius = waveHorRadius(progress);
  const vertRadius = waveVertRadius(progress);
  const sWidth = sideWidth(progress);
  useCode(debug("progress", progress), []);
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View>
        <Weave
          centerY={translateY}
          sideWidth={sWidth}
          {...{ horRadius, vertRadius }}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};
