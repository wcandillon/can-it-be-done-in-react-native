import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";

import { PanGestureHandler, State } from "react-native-gesture-handler";
import { onGestureEvent, snapPoint } from "react-native-redash";
import Weave from "./Weave";
import { followPointer, snapProgress } from "./AnimationHelpers";
import {
  initialSideWidth,
  initialWaveCenter,
  sideWidth,
  waveHorRadius,
  waveHorRadiusBack,
  waveVertRadius
} from "./WeaveHelpers";
import Content from "./Content";

export const assets = [
  require("./assets/firstPageImage.png"),
  require("./assets/secondPageImage.png")
];

const { width } = Dimensions.get("window");
const {
  Value,
  eq,
  abs,
  cond,
  add,
  min,
  multiply,
  divide,
  max,
  block,
  onChange,
  useCode,
  debug,
  interpolate,
  Extrapolate
} = Animated;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default () => {
  const y = new Value(initialWaveCenter);
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({
    translationX,
    velocityX,
    y,
    state
  });
  const isBack = new Value(0);
  const gestureProgress = cond(
    isBack,
    interpolate(translationX, {
      inputRange: [0, width - initialSideWidth],
      outputRange: [1, 0]
    }),
    interpolate(translationX, {
      inputRange: [-width, initialSideWidth],
      outputRange: [0.4, 0]
    })
  );
  const point = snapPoint(
    gestureProgress,
    divide(multiply(-1, velocityX), width),
    [0, 1]
  );
  const progress = snapProgress(gestureProgress, state, isBack, point);
  const centerY = followPointer(y);
  const horRadius = cond(
    isBack,
    waveHorRadiusBack(progress),
    waveHorRadius(progress)
  );
  const vertRadius = waveVertRadius(progress);
  const sWidth = sideWidth(progress);
  // useCode(debug("progress", progress), []);
  return (
    <View style={styles.container}>
      <Content
        backgroundColor="white"
        source={assets[0]}
        title1="Online"
        title2="Gambling"
        color="black"
      />
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Weave sideWidth={sWidth} {...{ centerY, horRadius, vertRadius }}>
            <Content
              backgroundColor="#4d1168"
              source={assets[1]}
              title1="For"
              title2="Gamers"
              color="#fd5587"
            />
          </Weave>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
