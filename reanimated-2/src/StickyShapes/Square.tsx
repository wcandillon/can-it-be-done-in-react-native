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
import {
  addCurve,
  addLine,
  clamp,
  createPath,
  serialize,
} from "react-native-redash";
import Svg, { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const { height } = Dimensions.get("window");
const MARGIN = 100;
const SIZE = 150;
enum Mode {
  TOP,
  BOTTOM,
  FREE,
}

const Square = () => {
  const mode = useSharedValue(Mode.TOP);
  const translateY = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    const delta = (() => {
      if (mode.value === Mode.TOP || mode.value === Mode.BOTTOM) {
        return interpolate(
          translateY.value,
          [0, height],
          mode.value === Mode.TOP ? [0, SIZE / 2] : [SIZE / 2, 0],
          Extrapolate.CLAMP
        );
      } else {
        return 0;
      }
    })();
    const c1 = (() => {
      if (mode.value === Mode.TOP) {
        return { x: MARGIN, y: 0 };
      } else if (mode.value === Mode.BOTTOM) {
        return { x: MARGIN + delta, y: height };
      } else {
        return { x: MARGIN, y: translateY.value };
      }
    })();
    const c2 = (() => {
      if (mode.value === Mode.TOP) {
        return { x: MARGIN + SIZE, y: 0 };
      } else if (mode.value === Mode.BOTTOM) {
        return { x: MARGIN + SIZE - delta, y: height };
      } else {
        return { x: MARGIN + SIZE, y: translateY.value };
      }
    })();
    const c3 = (() => {
      if (mode.value === Mode.TOP) {
        return { x: MARGIN + SIZE - delta, y: SIZE + translateY.value };
      } else if (mode.value === Mode.BOTTOM) {
        return { x: MARGIN + SIZE, y: height };
      } else {
        return { x: MARGIN + SIZE, y: translateY.value + SIZE };
      }
    })();
    const c4 = (() => {
      if (mode.value === Mode.TOP) {
        return { x: MARGIN + delta, y: SIZE + translateY.value };
      } else if (mode.value === Mode.BOTTOM) {
        return { x: MARGIN, y: height };
      } else {
        return { x: MARGIN, y: translateY.value + SIZE };
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
