import * as React from "react";
import { Platform, StyleSheet } from "react-native";
import {
  ReText,
  onGestureEvent,
  snapPoint,
  timing,
  useValues,
  withOffset,
} from "react-native-redash";
import Animated, {
  block,
  cond,
  eq,
  set,
  useCode,
} from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const { Value, round, divide, concat, add } = Animated;

interface CursorProps {
  x: Animated.Value<number>;
  size: number;
  count: number;
}

export default ({ size, count, x }: CursorProps) => {
  const snapPoints = new Array(count).fill(0).map((e, i) => i * size);
  const index = round(divide(x, size));
  const [translationX, velocityX, state] = useValues(
    [0, 0, State.UNDETERMINED],
    []
  );
  const gestureHandler = onGestureEvent({ translationX, velocityX, state });
  const offset = new Value(0);
  const value = add(translationX, offset);
  const translateX = block([
    cond(
      eq(state, State.END),
      set(
        offset,
        timing({ from: value, to: snapPoint(value, velocityX, snapPoints) })
      ),
      value
    ),
  ]);
  useCode(() => set(x, translateX), []);
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: "white",
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          justifyContent: "center",
          alignItems: "center",
          transform: [{ translateX }],
        }}
      >
        <ReText style={{ fontSize: 24 }} text={concat(add(index, 1))} />
      </Animated.View>
    </PanGestureHandler>
  );
};
