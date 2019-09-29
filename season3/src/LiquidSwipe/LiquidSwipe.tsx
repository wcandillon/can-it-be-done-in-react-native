import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";

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
import Content from "./Content";

const { width } = Dimensions.get("window");
const maxChange = width * (1 / 0.45);
const snapPoints = [-width, 0];
const {
  Clock,
  Value,
  eq,
  cond,
  min,
  multiply,
  divide,
  max,
  block,
  timing,
  set,
  stopClock,
  startClock,
  not,
  clockRunning,
  useCode,
  debug
} = Animated;

const springRatio = (
  value: Animated.Node<number>,
  velocity: Animated.Node<number>,
  gesture: Animated.Value<State>,
  isBack: Animated.Value<0 | 1>,
  point: Animated.Node<number>
) => {
  const clock = new Clock();
  const state = {
    time: new Value(0),
    frameTime: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    finished: new Value(0)
  };
  const config = {
    toValue: new Value(0),
    duration: 500,
    easing: Easing.inOut(Easing.ease)
  };
  return block([
    cond(
      eq(gesture, State.ACTIVE),
      [
        stopClock(clock),
        set(state.position, value),
        set(state.velocity, velocity)
      ],
      [
        cond(not(clockRunning(clock)), [
          set(state.time, 0),
          set(state.frameTime, 0),
          set(state.finished, 0),
          set(config.toValue, point),
          startClock(clock)
        ]),
        timing(clock, state, config),
        cond(eq(state.finished, 1), set(isBack, point))
      ]
    ),
    state.position
  ]);
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

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
    snapPoints
  });
  const translateY = withSpring({
    value: translationY,
    velocity: velocityY,
    state,
    snapPoints: [initialWaveCenter],
    offset: offsetY
  });
  const isBack = new Value(0);
  const gestureProgress = min(
    1,
    max(0, divide(multiply(-1, translateX), cond(isBack, width, maxChange)))
  );
  const point = snapPoint(translateX, velocityX, snapPoints);
  const progress = springRatio(
    gestureProgress,
    divide(velocityX, width),
    state,
    isBack,
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
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <Content
          backgroundColor="white"
          source={require("./assets/firstPageImage.png")}
          title1="Online"
          title2="Gambling"
          color="black"
        />
      </View>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={styles.container}>
          <Weave
            centerY={translateY}
            sideWidth={sWidth}
            {...{ horRadius, vertRadius }}
          >
            <Content
              backgroundColor="#4d1168"
              source={require("./assets/secondPageImage.png")}
              title1="For"
              title2="Gamers"
              color="#fd5587"
            />
          </Weave>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View
        pointerEvents="none"
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(100, 200, 300, 0)",
          transform: [{ translateX }, { translateY }]
        }}
      />
    </View>
  );
};
