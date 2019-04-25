import * as React from "react";
import { DangerZone, GestureHandler } from "expo";
import { StyleSheet } from "react-native";
import { atan2 } from "./Math";

const { Animated } = DangerZone;
const {
  Value, event, block, cond, eq, set, add, sub, multiply, sin, cos, debug,
} = Animated;
type Value = typeof Value;
const { PanGestureHandler, State } = GestureHandler;

interface CursorProps {
  radius: number;
  angle: Value;
}

export default ({ radius, angle }: CursorProps) => {
  const α = new Value(0);
  const x = new Value(0);
  const y = new Value(0);
  const xOffset = new Value(0);
  const yOffset = new Value(0);
  const translateX = new Value(0);
  const translateY = new Value(0);
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
    <>
      <Animated.Code>
        {
          () => block([
            cond(eq(state, State.ACTIVE), [
              set(x, add(xOffset, translationX)),
              set(y, add(yOffset, translationY)),
            ]),
            cond(eq(state, State.END), [
              set(xOffset, x),
              set(yOffset, y),
            ]),
            set(α, atan2(add(multiply(y, -1), radius), sub(x, radius))),
            set(angle, α),
            set(translateX, add(multiply(radius, cos(α)), radius)),
            set(translateY, add(multiply(-1 * radius, sin(α)), radius)),
          ])
        }
      </Animated.Code>
      <PanGestureHandler onHandlerStateChange={onGestureEvent} {...{ onGestureEvent }}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "white",
            width: 50,
            height: 50,
            borderRadius: 25,
            transform: [
              { translateX },
              { translateY },
            ],
          }}
        />
      </PanGestureHandler>
    </>
  );
};
