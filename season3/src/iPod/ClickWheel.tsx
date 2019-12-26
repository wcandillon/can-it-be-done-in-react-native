import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  Value,
  add,
  block,
  debug,
  diff,
  modulo,
  set,
  sub,
  useCode
} from "react-native-reanimated";

import {
  canvas2Polar,
  onGestureEvent,
  polar2Canvas,
  toDeg
} from "react-native-redash";

const { width } = Dimensions.get("window");
const size = 0.75 * (width - 32);
const hole = size * 0.39;
const center = {
  x: size / 2,
  y: size / 2
};
const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: "#323232",
    justifyContent: "center",
    alignItems: "center"
  },
  center: {
    width: hole,
    height: hole,
    borderRadius: hole / 2,
    backgroundColor: "black"
  }
});

interface ClickWheelProps {
  alpha: Animated.Value<number>;
}

export default ({ alpha }: ClickWheelProps) => {
  const state = new Value(State.UNDETERMINED);
  const x = new Value(0);
  const y = new Value(0);
  const gestureHandler = onGestureEvent({ state, x, y });
  const pX = sub(x, diff(x));
  const pY = sub(y, diff(y));
  const a = modulo(canvas2Polar({ x, y }, center).alpha, 2 * Math.PI);
  const pA = modulo(canvas2Polar({ x: pX, y: pY }, center).alpha, 2 * Math.PI);
  const delta = sub(a, pA);
  useCode(
    () => block([debug("delta", toDeg(delta)), set(alpha, add(alpha, delta))]),
    [alpha, delta]
  );
  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFillObject}>
        <Animated.View
          style={{
            transform: [
              {
                translateX: polar2Canvas({ alpha, radius: size / 2 }).x
              },
              {
                translateY: polar2Canvas({ alpha, radius: size / 2 }).y
              }
            ],
            width: 50,
            height: 50,
            backgroundColor: "red"
          }}
        />
      </View>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill} />
      </PanGestureHandler>
      <View style={styles.center} />
    </View>
  );
};
