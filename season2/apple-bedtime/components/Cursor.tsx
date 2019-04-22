import * as React from "react";
import { DangerZone, GestureHandler } from "expo";
import { StyleSheet } from "react-native";
import { number } from "prop-types";

const { Animated } = DangerZone;
const {
  Value, event, block, cond, eq, set, add, sqrt, pow, sub, min, max, debug, multiply, lessThan, atan, divide, sin, cos,
} = Animated;
const { PanGestureHandler, State } = GestureHandler;
const addBounds = (n: typeof Value, lowerBound: number, upperBound: number): typeof Value => min(max(n, lowerBound), upperBound);
const circle = (x: typeof Value, radius: number, top: typeof Value): typeof Value => multiply(sqrt(sub(pow(radius, 2), pow(x, 2))), cond(top, -1, 1));

interface CursorProps {
  radius: number;
}

export default ({ radius }: CursorProps) => {
  const x = new Value(0);
  const y = new Value(0);
  const xOffset = new Value(0);
  const yOffset = new Value(0);
  const translateX = new Value(0);
  const translateY = new Value(0);
  const translationX = new Value(0);
  const translationY = new Value(0);
  const α = new Value(0);
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
    { useNativeDriver: true },
  );

  return (
    <>
      <Animated.Code>
        {
          () => block([
            cond(eq(state, State.ACTIVE), [
              set(x, addBounds(add(xOffset, translationX), 0, radius * 2)),
              set(y, addBounds(add(yOffset, translationY), 0, radius * 2)),
            ]),
            cond(eq(state, State.END), [
              set(xOffset, x),
              set(yOffset, y),
            ]),
            set(α, atan(divide(sub(x, radius) / add(y, radius)))),
            set(translateX, multiply(radius, sin(α))),
            set(translateY, multiply(radius, cos(α))),
          ])
        }
      </Animated.Code>
      <PanGestureHandler onHandlerStateChange={onGestureEvent} {...{ onGestureEvent }}>
        <Animated.View
          style={{
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
