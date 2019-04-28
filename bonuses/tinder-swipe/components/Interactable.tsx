import * as React from "react";
import { View, ViewStyle } from "react-native";

import { DangerZone, GestureHandler } from "expo";
import { runSpring, simpleInterpolation } from "./AnimationHelpers";

const { PanGestureHandler, State } = GestureHandler;
const { Animated } = DangerZone;
const {
  Value, event, block, set, cond, eq, Clock, interpolate,
} = Animated;

type Value = typeof Value;

interface SnapPoint {
  x: number;
}

interface InteractableProps {
  x: Value;
  y: Value;
  snapPoints: SnapPoint[];
  onSnap: (e: { nativeEvent: { x: number } }) => void;
  style: ViewStyle;
}

export default ({
  style, x, y, snapPoints,
}: InteractableProps) => {
  const clock = new Clock();
  const spring = new Value(0);
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const onGestureEvent = event(
    [
      {
        nativeEvent: {
          velocityX,
          translationX,
          translationY,
          state,
        },
      },
    ],
  );
  return (
    <PanGestureHandler onHandlerStateChange={onGestureEvent} {...{ onGestureEvent }}>
      <Animated.View {...{ style }}>
        <Animated.Code>
          {
            () => block([
              cond(eq(state, State.END), set(spring, runSpring(clock, 0, 1))),
              set(x, [
                cond(eq(state, State.ACTIVE), translationX, [
                  simpleInterpolation(spring, translationX, 0),
                ]),
              ]),
              set(y, [
                cond(eq(state, State.ACTIVE), translationY, [
                  simpleInterpolation(spring, translationY, 0),
                ]),
              ]),
            ])
          }
        </Animated.Code>
      </Animated.View>
    </PanGestureHandler>
  );
};
