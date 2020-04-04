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

function match(
  condsAndResPairs: readonly Animated.Node<number>[],
  offset = 0
): undefined | Animated.Node<number> {
  if (condsAndResPairs.length - offset === 1) {
    return condsAndResPairs[offset];
  }
  if (condsAndResPairs.length - offset === 0) {
    return undefined;
  }
  return cond(
    condsAndResPairs[offset],
    condsAndResPairs[offset + 1],
    match(condsAndResPairs, offset + 2)
  );
}

function colorHSV(
  h: Animated.Adaptable<number> /* 0 - 360 */,
  s: Animated.Adaptable<number> /* 0 - 1 */,
  v: Animated.Adaptable<number> /* 0 - 1 */
): Animated.Node<number> {
  // Converts color from HSV format into RGB
  // Formula explained here: https://www.rapidtables.com/convert/color/hsv-to-rgb.html
  const c = multiply(v, s);
  const hh = divide(h, 60);
  const x = multiply(c, sub(1, abs(sub(modulo(hh, 2), 1))));

  const m = sub(v, c);

  const colorRGB = (
    r: Animated.Adaptable<number>,
    g: Animated.Adaptable<number>,
    b: Animated.Adaptable<number>
  ) =>
    color(
      round(multiply(255, add(r, m))),
      round(multiply(255, add(g, m))),
      round(multiply(255, add(b, m)))
    );

  return match([
    lessThan(h, 60),
    colorRGB(c, x, 0),
    lessThan(h, 120),
    colorRGB(x, c, 0),
    lessThan(h, 180),
    colorRGB(0, c, x),
    lessThan(h, 240),
    colorRGB(0, x, c),
    lessThan(h, 300),
    colorRGB(x, 0, c),
    colorRGB(c, 0, x) /* else */
  ]) as Animated.Node<number>;
}

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
