import React, { useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  State,
  TapGestureHandler
} from "react-native-gesture-handler";
import Animated, {
  Value,
  abs,
  add,
  block,
  cond,
  debug,
  defined,
  divide,
  eq,
  greaterThan,
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
  const tap = useRef(null);
  const wheel = useRef(null);
  const [state, x, y, deltaX, deltaY] = useValues(
    [State.UNDETERMINED, 0, 0, 0, 0],
    []
  );
  const tapState = new Value(0);
  const gestureHandler = onGestureEvent({ state, x, y });
  const tapGestureHandler = onGestureEvent({ state: tapState });
  const x0 = cond(eq(state, State.ACTIVE), sub(x, deltaX), x);
  const y0 = cond(eq(state, State.ACTIVE), sub(y, deltaY), y);
  const a0 = canvas2Polar({ x: x0, y: y0 }, center).alpha;
  const a = canvas2Polar({ x, y }, center).alpha;
  const da = sub(a0, a);
  useCode(
    () =>
      block([
        set(deltaX, diff(x)),
        set(deltaY, diff(y)),
        set(
          alpha,
          add(
            alpha,
            cond(
              greaterThan(abs(da), Math.PI),
              cond(
                greaterThan(a0, 0),
                sub(2 * Math.PI, da),
                sub(-2 * Math.PI, da)
              ),
              da
            )
          )
        ),
        debug("alpha", toDeg(alpha)),
        debug("tapState", tapState)
      ]),
    [a0, alpha, da, deltaX, deltaY, tapState, x, y]
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
      <TapGestureHandler ref={tap} {...tapGestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <PanGestureHandler ref={wheel} {...gestureHandler}>
            <Animated.View style={StyleSheet.absoluteFill} />
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler>
      <View style={styles.center} />
    </View>
  );
};
