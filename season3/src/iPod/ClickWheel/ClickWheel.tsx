import React from "react";
import { StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  abs,
  add,
  block,
  cond,
  eq,
  greaterThan,
  max,
  set,
  sub,
  useCode,
} from "react-native-reanimated";
import {
  canvas2Polar,
  onGestureEvent,
  useDiff,
  useValues,
} from "react-native-redash";

import Buttons, { Command, size } from "./Buttons";
import Stickers from "./Stickers";

const { PI } = Math;
const hole = size * 0.39;
const center = {
  x: size / 2,
  y: size / 2,
};
const delta = (a0: Animated.Node<number>, a: Animated.Node<number>) => {
  const da = sub(a0, a);
  return cond(
    greaterThan(abs(da), PI),
    cond(greaterThan(a0, 0), sub(2 * PI, da), sub(-2 * PI, da)),
    da
  );
};
const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: "#323232",
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    width: hole,
    height: hole,
    borderRadius: hole / 2,
    backgroundColor: "black",
  },
});

interface ClickWheelProps {
  alpha: Animated.Value<number>;
  command: Animated.Value<Command>;
}

export default ({ alpha, command }: ClickWheelProps) => {
  const [state, x, y] = useValues(State.UNDETERMINED, 0, 0, 0, 0);
  const deltaX = useDiff(x);
  const deltaY = useDiff(y);
  const gestureHandler = onGestureEvent({ state, x, y });
  const x0 = cond(eq(state, State.ACTIVE), sub(x, deltaX), x);
  const y0 = cond(eq(state, State.ACTIVE), sub(y, deltaY), y);
  const a0 = canvas2Polar({ x: x0, y: y0 }, center).theta;
  const a = canvas2Polar({ x, y }, center).theta;
  const da = delta(a0, a);
  useCode(() => block([set(alpha, max(add(alpha, da), 0))]), [alpha, da]);
  return (
    <View style={styles.container}>
      <View style={styles.center} />
      <Buttons {...{ command }}>
        <PanGestureHandler {...gestureHandler}>
          <Animated.View style={StyleSheet.absoluteFill} />
        </PanGestureHandler>
      </Buttons>
      <Stickers />
    </View>
  );
};
