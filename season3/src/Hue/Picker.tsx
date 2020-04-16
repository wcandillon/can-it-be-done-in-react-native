/* eslint-disable max-len */
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg";
import Animated, {
  Value,
  cond,
  divide,
  eq,
  modulo,
  pow,
  set,
  useCode,
} from "react-native-reanimated";
import {
  canvas2Polar,
  clamp,
  onGestureEvent,
  polar2Canvas,
  translate,
  vec,
  withOffset,
} from "react-native-redash";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const quadraticIn = (t: Animated.Node<number>) => pow(t, 2);
const { width } = Dimensions.get("window");
const PICKER_WIDTH = 30;
const PICKER_HEIGHT = (PICKER_WIDTH * 60) / 40;
const STROKE_WIDTH = 4;
export const CANVAS_SIZE = width - PICKER_WIDTH * 2;
const CENTER = {
  x: CANVAS_SIZE / 2,
  y: CANVAS_SIZE / 2,
};

interface PickerProps {
  h: Animated.Value<number>;
  s: Animated.Value<number>;
  backgroundColor: Animated.Node<number>;
}

export default ({ h, s, backgroundColor }: PickerProps) => {
  const state = new Value(State.UNDETERMINED);
  const translation = vec.createValue(0, 0);
  const gestureHandler = onGestureEvent({
    state,
    translationX: translation.x,
    translationY: translation.y,
  });
  const offset = {
    x: withOffset(translation.x, state),
    y: withOffset(translation.y, state),
  };
  const v2 = vec.add(offset, CENTER);
  const polar = canvas2Polar(v2, CENTER);
  const l = {
    theta: polar.theta,
    radius: clamp(polar.radius, 0, CANVAS_SIZE / 2),
  };
  const hue = divide(modulo(l.theta, 2 * Math.PI), 2 * Math.PI);
  const saturation = cond(
    eq(l.radius, 0),
    0,
    divide(l.radius, CANVAS_SIZE / 2)
  );
  useCode(() => [set(h, hue), set(s, quadraticIn(saturation))], [
    h,
    hue,
    s,
    saturation,
  ]);
  return (
    <View style={StyleSheet.absoluteFill}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            elevation: 24,
            transform: [
              ...translate(polar2Canvas(l, CENTER)),
              ...translate({
                x: -PICKER_WIDTH / 2,
                y: -PICKER_HEIGHT / 2,
              }),
            ],
          }}
        >
          <Svg
            width={PICKER_WIDTH + STROKE_WIDTH * 2}
            height={PICKER_HEIGHT}
            style={{ top: -PICKER_HEIGHT / 2 }}
            viewBox={`-${STROKE_WIDTH / 2} -${STROKE_WIDTH / 2} ${
              44 + STROKE_WIDTH
            } ${60 + STROKE_WIDTH}`}
          >
            <AnimatedPath
              d="M22 .889C9.943.889.167 10.664.167 22.723.167 37.127 22 59.111 22 59.111S43.833 37.43 43.833 22.723C43.833 10.664 34.057.889 22 .889z"
              fill={backgroundColor}
              stroke="#fff"
              strokeWidth={STROKE_WIDTH}
              fillRule="evenodd"
            />
          </Svg>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
