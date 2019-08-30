import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import {
  PanGestureHandler,
  RectButton,
  State
} from "react-native-gesture-handler";
import { clamp, onGestureEvent, withSpring } from "react-native-redash";

const { height } = Dimensions.get("window");
const SNAP_TOP = 0;
const SNAP_BOTTOM = height - 64;
const config = {
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1
};
const { Value, cond, eq } = Animated;
const withClamp = (
  value: Animated.Node<number>,
  state: Animated.Value<State>,
  min: Animated.Adaptable<number>,
  max: Animated.Adaptable<number>
) => cond(eq(state, State.ACTIVE), clamp(value, min, max), value);

const styles = StyleSheet.create({
  playerSheet: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "cyan"
  },
  navigation: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "blue"
  }
});

export default () => {
  const translationY = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({
    state,
    translationY,
    velocityY
  });
  const translateY = withClamp(
    withSpring({
      value: translationY,
      velocity: velocityY,
      state,
      snapPoints: [SNAP_TOP, SNAP_BOTTOM],
      config
    }),
    state,
    SNAP_TOP,
    SNAP_BOTTOM
  );
  return (
    <>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={[styles.playerSheet, { transform: [{ translateY }] }]}
        />
      </PanGestureHandler>
      <View style={styles.navigation}>
        <RectButton>
          <Text>Up</Text>
        </RectButton>
        <RectButton>
          <Text>Down</Text>
        </RectButton>
      </View>
    </>
  );
};
