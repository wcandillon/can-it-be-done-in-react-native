import { StyleSheet, View } from "react-native";
import type { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import { canvas2Polar, normalizeRad, PI } from "react-native-redash";

import { RADIUS, DELTA } from "./Quadrant";

const SIZE = RADIUS * 2;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  quadrant: {
    width: SIZE,
    height: SIZE,
  },
});

const blockValue = (oldVal: number, newVal: number) => {
  "worklet";
  if ((oldVal > 1.5 * PI && newVal < PI / 2) || oldVal === 0) {
    return 2 * PI;
  }
  if (oldVal < PI / 2 && newVal > 1.5 * PI) {
    return 0.01;
  }
  return newVal;
};

interface GestureProps {
  theta: Animated.SharedValue<number>;
  passcode: Animated.SharedValue<string>;
}

export const Gesture = ({ theta, passcode }: GestureProps) => {
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { offset: number }
  >({
    onStart: (_, ctx) => {
      ctx.offset = theta.value;
    },
    onActive: ({ x, y }, ctx) => {
      const newVal = normalizeRad(
        canvas2Polar({ x, y }, { x: RADIUS, y: RADIUS }).theta
      );
      theta.value = blockValue(ctx.offset, newVal);
      ctx.offset = theta.value;
    },
    onEnd: () => {
      const val = Math.round(theta.value / DELTA) + 1;
      passcode.value += `${val === 10 ? 0 : val}`;
      theta.value = withSpring(2 * PI);
    },
  });
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={styles.quadrant} />
      </PanGestureHandler>
    </View>
  );
};
