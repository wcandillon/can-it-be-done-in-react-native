import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  Value,
  add,
  block,
  cond,
  debug,
  defined,
  divide,
  eq,
  lessThan,
  modulo,
  multiply,
  neq,
  set,
  sub,
  useCode
} from "react-native-reanimated";

import {
  canvas2Polar,
  onGestureEvent,
  polar2Canvas,
  toDeg,
  useValues
} from "react-native-redash";

const diff = (v: Animated.Node<number>) => {
  const stash = new Value(0);
  const prev: Animated.Value<number> = new Value();
  return block([
    set(stash, cond(defined(prev), sub(v, prev), 0)),
    set(prev, v),
    stash
  ]);
};

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
  const [state, x, y, deltaX, deltaY] = useValues(
    [State.UNDETERMINED, 0, 0, 0, 0],
    []
  );
  const gestureHandler = onGestureEvent({ state, x, y });
  const pX = cond(eq(state, State.ACTIVE), sub(x, deltaX), x);
  const pY = cond(eq(state, State.ACTIVE), sub(y, deltaY), y);
  const start = canvas2Polar({ x: pX, y: pY }, center).alpha;
  const end = canvas2Polar({ x, y }, center).alpha;
  const delta = sub(end, start);
  useCode(
    () =>
      block([
        set(deltaX, diff(x)),
        set(deltaY, diff(y)),
        debug("x", x),
        debug("y", y),
        debug("pX", pX),
        debug("pY", pY),
        set(alpha, add(alpha, delta))
      ]),
    [alpha, delta, deltaX, deltaY, pX, pY, x, y]
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
