import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { PanGestureHandler, State } from "react-native-gesture-handler";
import { onGestureEvent, snapPoint, withSpring } from "react-native-redash";
import Weave from "./Weave";
import {
  initialWaveCenter,
  sideWidth,
  waveHorRadius,
  waveHorRadiusBack,
  waveVertRadius
} from "./WeaveHelpers";

const { width } = Dimensions.get("window");
const maxChange = width * (1 / 0.45);
const snapPoints = [-width, 0];
const {
  Clock,
  Value,
  interpolate,
  eq,
  greaterOrEq,
  cond,
  useCode,
  debug,
  min,
  multiply,
  divide,
  max,
  SpringUtils,
  block,
  spring,
  startClock,
  set,
  sub,
  onChange
} = Animated;
const springRatio = (
  value: Animated.Node<number>,
  velocity: Animated.Node<number>,
  gesture: Animated.Value<State>,
  snapTo: Animated.Node<number>
) => {
  const clock = new Clock();
  const state = {
    time: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    finished: new Value(0)
  };
  const config = SpringUtils.makeDefaultConfig();
  return block([
    startClock(clock),
    cond(
      eq(gesture, State.ACTIVE),
      [
        set(state.time, 0),
        set(state.finished, 0),
        set(state.position, value),
        set(state.velocity, velocity),
        set(config.toValue, snapTo)
      ],
      spring(clock, state, config)
    ),
    state.position
  ]);
};

export default () => {
  // const absoluteY = new Value(0);
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const offsetY = new Value(initialWaveCenter);
  const isBack = new Value(0);
  const gestureHandler = onGestureEvent({
    translationX,
    translationY,
    velocityX,
    velocityY,
    // absoluteY,
    state
  });
  const translateX = withSpring({
    value: translationX,
    velocity: velocityX,
    state,
    snapPoints
  });
  const translateY = withSpring({
    value: translationY,
    velocity: velocityY,
    state,
    snapPoints: [initialWaveCenter],
    offset: offsetY
  });
  const point = snapPoint(translationX, velocityX, snapPoints);
  const gestureProgress = min(
    1,
    max(0, divide(multiply(-1, translateX), cond(isBack, width, maxChange)))
  );
  const progress = springRatio(
    gestureProgress,
    divide(velocityX, width),
    state,
    cond(eq(point, snapPoints[0]), 1, 0)
  );
  const horRadius = cond(
    isBack,
    waveHorRadiusBack(progress),
    waveHorRadius(progress)
  );
  const vertRadius = waveVertRadius(progress);
  const sWidth = sideWidth(progress);
  return (
    <View style={{ flex: 1 }}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View>
          <Weave
            centerY={translateY}
            sideWidth={sWidth}
            {...{ horRadius, vertRadius }}
          />
        </Animated.View>
      </PanGestureHandler>
      <Animated.View
        pointerEvents="none"
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(100, 200, 300, 0.4)",
          transform: [{ translateX }, { translateY }]
        }}
      />
    </View>
  );
};
