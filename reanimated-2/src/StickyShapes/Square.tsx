import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { addLine, createPath, serialize } from "react-native-redash";
import Svg, { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const { height } = Dimensions.get("window");
const SIZE = 150;
enum Mode {
  TOP,
  BOTTOM,
  FREE,
}
const exhaustiveCheck = (value: never) => {
  throw new Error(value + " was not handled");
};

const Square = () => {
  const mode = useSharedValue(Mode.TOP);
  const translateY = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    const delta = interpolate(
      translateY.value,
      [-height, 0, height],
      [SIZE / 2, 0, SIZE / 2],
      Extrapolate.CLAMP
    );
    const { c1, c2, c3, c4 } = (() => {
      if (mode.value === Mode.TOP) {
        return {
          c1: { x: 0, y: 0 },
          c2: { x: SIZE, y: 0 },
          c3: { x: SIZE - delta, y: SIZE + translateY.value },
          c4: { x: delta, y: SIZE + translateY.value },
        };
      } else if (mode.value === Mode.BOTTOM) {
        return {
          c1: { x: delta, y: height - SIZE + translateY.value },
          c2: { x: SIZE - delta, y: height - SIZE + translateY.value },
          c3: { x: SIZE, y: height },
          c4: { x: 0, y: height },
        };
      } else if (mode.value === Mode.FREE) {
        return {
          c1: { x: 0, y: translateY.value },
          c2: { x: SIZE, y: translateY.value },
          c3: { x: SIZE, y: translateY.value + SIZE },
          c4: { x: 0, y: translateY.value + SIZE },
        };
      } else {
        return exhaustiveCheck(mode);
      }
    })();
    const path = createPath(c1);
    addLine(path, c2);
    addLine(path, c3);
    addLine(path, c4);
    return {
      d: serialize(path),
    };
  });
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { y: number }
  >({
    onStart: (_, ctx) => {
      ctx.y = translateY.value;
    },
    onActive: ({ translationY }, ctx) => {
      translateY.value = ctx.y + translationY;
    },
    onEnd: ({ velocityY }) => {
      translateY.value = withSpring(0, {
        velocity: velocityY,
        overshootClamping: true,
      });
    },
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <Svg style={StyleSheet.absoluteFill}>
          <AnimatedPath animatedProps={animatedProps} fill="#7EDAB9" />
        </Svg>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Square;
