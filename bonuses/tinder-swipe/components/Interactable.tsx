import * as React from "react";
import { View, ViewStyle } from "react-native";

import { DangerZone, GestureHandler } from "expo";

const { PanGestureHandler, State } = GestureHandler;
const { Animated } = DangerZone;
const {
  Value, event, block, set,
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
  const translationX = new Value(0);
  const translationY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const onGestureEvent = event(
    [
      {
        nativeEvent: {
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
              set(x, translationX),
              set(y, translationY),
            ])
          }
        </Animated.Code>
      </Animated.View>
    </PanGestureHandler>
  );
};
