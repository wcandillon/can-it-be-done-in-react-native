import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  add,
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  addCurve,
  addLine,
  createPath,
  serialize,
  snapPoint,
  useVector,
} from "react-native-redash";
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
  const isGestureActive = useSharedValue(false);
  const p1 = useVector();
  const p2 = useVector();
  const p3 = useVector();
  const p4 = useVector();
  const y = useDerivedValue(() =>
    translateY.value < 0 ? height + translateY.value - SIZE : translateY.value
  );
  const animatedProps = useAnimatedProps(() => {
    const delta = interpolate(
      translateY.value,
      [-height / 4, 0, height / 4],
      [SIZE / 2 - 25, 0, SIZE / 2 - 25],
      Extrapolate.CLAMP
    );
    const points = (() => {
      switch (mode.value) {
        case Mode.TOP:
          return {
            c1: { x: 0, y: 0 },
            c2: { x: SIZE, y: 0 },
            c3: { x: SIZE - delta, y: SIZE + translateY.value },
            c4: { x: delta, y: SIZE + translateY.value },
          };
        case Mode.BOTTOM:
          return {
            c1: { x: delta, y: height - SIZE + translateY.value },
            c2: { x: SIZE - delta, y: height - SIZE + translateY.value },
            c3: { x: SIZE, y: height },
            c4: { x: 0, y: height },
          };
        case Mode.FREE:
          return {
            c1: { x: 0, y: y.value },
            c2: { x: SIZE, y: y.value },
            c3: { x: SIZE, y: y.value + SIZE },
            c4: { x: 0, y: y.value + SIZE },
          };
        default:
          return exhaustiveCheck(mode);
      }
    })();
    p1.x.value =
      isGestureActive.value && mode.value === Mode.FREE
        ? points.c1.x
        : withSpring(points.c1.x);
    p1.y.value =
      isGestureActive.value && mode.value === Mode.FREE
        ? points.c1.y
        : withSpring(points.c1.y);
    p2.x.value =
      isGestureActive.value && mode.value === Mode.FREE
        ? points.c2.x
        : withSpring(points.c2.x);
    p2.y.value =
      isGestureActive.value && mode.value === Mode.FREE
        ? points.c2.y
        : withSpring(points.c2.y);
    p3.x.value =
      isGestureActive.value && mode.value === Mode.FREE
        ? points.c3.x
        : withSpring(points.c3.x);
    p3.y.value =
      isGestureActive.value && mode.value === Mode.FREE
        ? points.c3.y
        : withSpring(points.c3.y);
    p4.x.value =
      isGestureActive.value && mode.value === Mode.FREE
        ? points.c4.x
        : withSpring(points.c4.x);
    p4.y.value =
      isGestureActive.value && mode.value === Mode.FREE
        ? points.c4.y
        : withSpring(points.c4.y);
    const c1 = { x: p1.x.value, y: p1.y.value };
    const c2 = { x: p2.x.value, y: p2.y.value };
    const c3 = { x: p3.x.value, y: p3.y.value };
    const c4 = { x: p4.x.value, y: p4.y.value };
    const path = createPath(c1);
    if (mode.value === Mode.TOP) {
      addLine(path, c2);
      addCurve(path, {
        c1: c2,
        c2: { x: c3.x, y: c2.y },
        to: c3,
      });
      addLine(path, c4);
      addCurve(path, {
        c1: c4,
        c2: { x: c4.x, y: c1.y },
        to: c1,
      });
    } else {
      addLine(path, c2);
      addCurve(path, {
        c1: c2,
        c2: { x: c2.x, y: c3.y },
        to: c3,
      });
      addLine(path, c4);
      addCurve(path, {
        c1: c4,
        c2: { x: c1.x, y: c4.y },
        to: c1,
      });
    }
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
      isGestureActive.value = true;
    },
    onActive: ({ translationY }, ctx) => {
      translateY.value = ctx.y + translationY;
      if (Math.abs(translateY.value) > height / 4) {
        mode.value = Mode.FREE;
      }
    },
    onEnd: ({ velocityY }) => {
      const dest = snapPoint(y.value, velocityY, [0, height]);
      if (dest === 0) {
        mode.value = Mode.TOP;
      } else {
        mode.value = Mode.BOTTOM;
      }
      translateY.value = 0;
      isGestureActive.value = false;
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
