import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  Value,
  abs,
  add,
  color,
  cond,
  debug,
  diffClamp,
  divide,
  floor,
  interpolate,
  lessThan,
  modulo,
  multiply,
  round,
  sub,
  useCode
} from "react-native-reanimated";
import {
  Vector,
  bInterpolate,
  canvas2Polar,
  clamp,
  onGestureEvent,
  polar2Canvas,
  toDeg,
  translate,
  withOffset
} from "react-native-redash";

const fract = (x: Animated.Node<number>) => sub(x, floor(x));
const mix = (
  x: Animated.Adaptable<number>,
  y: Animated.Adaptable<number>,
  a: Animated.Adaptable<number>
) => bInterpolate(a, x, y);

const hsv2rgb = (
  h: Animated.Adaptable<number>,
  s: Animated.Adaptable<number>,
  v: Animated.Adaptable<number>
) => {
  // vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  const K = {
    x: 1,
    y: 2 / 3,
    z: 1 / 3,
    w: 3
  };
  // vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  const p = {
    x: abs(sub(multiply(fract(add(h, K.x)), 6), K.w)),
    y: abs(sub(multiply(fract(add(h, K.y)), 6), K.w)),
    z: abs(sub(multiply(fract(add(h, K.z)), 6), K.w))
  };
  //   return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  const rgb = {
    x: multiply(v, mix(K.x, clamp(sub(p.x, K.x), 0, 1), s)),
    y: multiply(v, mix(K.x, clamp(sub(p.y, K.x), 0, 1), s)),
    z: multiply(v, mix(K.x, clamp(sub(p.z, K.x), 0, 1), s))
  };
  const result = {
    x: round(multiply(rgb.x, 255)),
    y: round(multiply(rgb.y, 255)),
    z: round(multiply(rgb.z, 255))
  };
  return color(result.x, result.y, result.z);
};

const { width } = Dimensions.get("window");
export const PICKER_SIZE = 40;
export const CANVAS_SIZE = width - PICKER_SIZE * 2;
const CENTER = {
  x: CANVAS_SIZE / 2,
  y: CANVAS_SIZE / 2
};
const OFFSET = {
  x: CANVAS_SIZE / 2 - PICKER_SIZE / 2,
  y: CANVAS_SIZE / 2 - PICKER_SIZE / 2
};

export default () => {
  const state = new Value(State.UNDETERMINED);
  const translation = Vector.create(0, 0);
  const gestureHandler = onGestureEvent({
    state,
    translationX: translation.x,
    translationY: translation.y
  });
  const offset = {
    x: withOffset(translation.x, state),
    y: withOffset(translation.y, state)
  };
  const vec = Vector.add(offset, OFFSET);
  const polar = canvas2Polar(vec, CENTER);
  const v = {
    theta: polar.theta,
    radius: clamp(polar.radius, 0, CANVAS_SIZE / 2)
  };
  // a * 0.5 / PI + 0.5;
  const angle = modulo(v.theta, 2 * Math.PI);
  const backgroundColor = hsv2rgb(
    interpolate(angle, {
      inputRange: [0, 2 * Math.PI],
      outputRange: [0, 1]
    }),
    divide(v.radius, CANVAS_SIZE / 2),
    1
  );
  useCode(
    () =>
      debug(
        "angle",
        interpolate(angle, {
          inputRange: [0, 2 * Math.PI],
          outputRange: [0, 1]
        })
      ),
    [angle]
  );
  return (
    <View style={StyleSheet.absoluteFill}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            borderColor: "white",
            borderWidth: 4,
            width: PICKER_SIZE,
            height: PICKER_SIZE,
            borderRadius: PICKER_SIZE / 2,
            backgroundColor,
            transform: translate(polar2Canvas(v, CENTER))
          }}
        />
      </PanGestureHandler>
    </View>
  );
};
