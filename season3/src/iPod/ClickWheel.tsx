import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  Value,
  abs,
  add,
  block,
  cond,
  cos,
  debug,
  diff,
  eq,
  greaterThan,
  interpolate,
  modulo,
  multiply,
  pow,
  set,
  sin,
  sqrt,
  sub,
  useCode
} from "react-native-reanimated";
import { atan2, onGestureEvent, toDeg, withOffset } from "react-native-redash";

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

export interface Point {
  x: Animated.Adaptable<number>;
  y: Animated.Adaptable<number>;
}

export interface PolarPoint {
  alpha: Animated.Adaptable<number>;
  radius: Animated.Adaptable<number>;
}

export const canvas2Cartesian = ({ x, y }: Point, center: Point): Point => {
  return {
    x: sub(x, center.x),
    y: multiply(sub(y, center.y), -1)
  };
};

export const cartesian2Canvas = ({ x, y }: Point, center: Point): Point => ({
  x: add(x, center.x),
  y: add(multiply(y, -1), center.y)
});

export const cartesian2Polar = ({ x, y }: Point): PolarPoint => {
  return {
    alpha: atan2(y, x),
    radius: sqrt(add(pow(x, 2), pow(y, 2)))
  };
};

export const polar2Cartesian = ({ alpha, radius }: PolarPoint): Point => ({
  x: multiply(radius, cos(alpha)),
  y: multiply(radius, sin(alpha))
});

interface ClickWheelProps {
  alpha: Animated.Value<number>;
}

export default ({ alpha }: ClickWheelProps) => {
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const translationY = new Value(0);
  const gestureHandler = onGestureEvent({ state, translationX, translationY });
  const translateX = withOffset(translationX, state);
  const translateY = withOffset(translationY, state);
  const x = translateX;
  const y = translateY;
  const point = canvas2Cartesian({ x, y }, center);
  const polarPoint = cartesian2Polar(point);
  const a = diff(modulo(polarPoint.alpha, 2 * Math.PI));
  useCode(
    () =>
      block([
        set(alpha, modulo(polarPoint.alpha, 2 * Math.PI)),
        debug("a", toDeg(a)),
        debug("alpha", toDeg(alpha))
      ]),
    [a, alpha, polarPoint.alpha]
  );
  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFillObject}>
        <Animated.View
          style={{
            transform: [
              {
                translateX: cartesian2Canvas(
                  polar2Cartesian({ alpha, radius: size / 2 }),
                  center
                ).x
              },
              {
                translateY: cartesian2Canvas(
                  polar2Cartesian({ alpha, radius: size / 2 }),
                  center
                ).y
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
