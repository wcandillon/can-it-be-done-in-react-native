import React from "react";
import { Dimensions, Platform, StyleSheet } from "react-native";
import Animated, {
  Value,
  add,
  block,
  cond,
  debug,
  defined,
  diff,
  eq,
  multiply,
  not,
  onChange,
  proc,
  round,
  set,
  sub,
  useCode,
} from "react-native-reanimated";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import {
  bInterpolate,
  onGestureEvent,
  timing,
  transformOrigin,
  translate,
} from "react-native-redash";

const duration = 1000;
const { width, height } = Dimensions.get("window");
const createPoint = (x: number, y: number) => ({
  x: new Value(x),
  y: new Value(y),
});
const center = {
  x: width / 2,
  y: height / 2,
};
const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
  },
});

export default () => {
  const origin = createPoint(0, 0);
  const pinch = createPoint(0, 0);
  const focal = createPoint(0, 0);
  const scale = new Value(1);
  const state = new Value(State.UNDETERMINED);
  const pinchGestureHandler = onGestureEvent({
    scale,
    state,
    focalX: focal.x,
    focalY: focal.y,
  });
  const fx = add(-center.x, focal.x);
  const fy = add(-center.y, focal.y);
  // See: https://github.com/kmagiera/react-native-gesture-handler/issues/553
  const pinchBegan =
    Platform.OS === "ios"
      ? eq(state, State.BEGAN)
      : eq(diff(state), State.ACTIVE - State.BEGAN);
  useCode(
    () =>
      block([
        cond(pinchBegan, [set(origin.x, fx), set(origin.y, fy)]),
        cond(eq(state, State.ACTIVE), [
          set(pinch.x, multiply(sub(origin.x, fx), -1)),
          set(pinch.y, multiply(sub(origin.y, fy), -1)),
        ]),
        cond(eq(state, State.END), [
          set(pinch.x, timing({ from: pinch.x, to: 0 })),
          set(pinch.y, timing({ from: pinch.y, to: 0 })),
          set(scale, timing({ from: scale, to: 1 })),
        ]),
      ]),
    [fx, fy, origin, pinch, pinchBegan, scale, state]
  );
  return (
    <PinchGestureHandler {...pinchGestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <Animated.Image
          style={[
            styles.image,
            {
              transform: [
                ...translate(pinch),
                ...transformOrigin(origin, { scale }),
              ],
            },
          ]}
          source={require("./assets/zurich.jpg")}
        />
      </Animated.View>
    </PinchGestureHandler>
  );
};
