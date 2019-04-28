import * as React from "react";
import { View, ViewStyle } from "react-native";

import { DangerZone, GestureHandler } from "expo";
import { runSpring, simpleInterpolation, getSnapPoint } from "./AnimationHelpers";

const { PanGestureHandler, State } = GestureHandler;
const { Animated } = DangerZone;
const {
  Value, event, block, set, cond, eq, Clock, debug, call, clockRunning, max, min, abs, sub, add, multiply,
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
  style, x, y, snapPoints, onSnap,
}: InteractableProps) => {
  const clock = new Clock();
  const spring = new Value(0);
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const snapPoint = new Value(0);
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
  const points = snapPoints.map(point => point.x);
  return (
    <PanGestureHandler onHandlerStateChange={onGestureEvent} {...{ onGestureEvent }}>
      <Animated.View {...{ style }}>
        <Animated.Code>
          {
            () => block([
              cond(eq(state, State.END), [
                set(snapPoint, getSnapPoint(translationX, velocityX, points)),
                set(spring, runSpring(clock, 0, 1)),
                cond(eq(clockRunning(clock), 0), call([snapPoint], ([x]) => onSnap({ nativeEvent: { x } }))),
              ]),
              set(x, [
                cond(eq(state, State.ACTIVE), translationX, [
                  simpleInterpolation(spring, translationX, snapPoint),
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
