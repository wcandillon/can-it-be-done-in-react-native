import * as React from "react";
import { DangerZone, GestureHandler } from "expo";
import { StyleSheet } from "react-native";
import { number } from "prop-types";

const { Animated } = DangerZone;
const {
  Value, event, block, cond, eq, set, add, sqrt, pow, sub, min, max, debug, multiply, lessThan, divide, sin, cos, abs,
} = Animated;
const { PanGestureHandler, State } = GestureHandler;
const atan = (x: typeof Value): typeof Value => sub(multiply(Math.PI / 4, x), multiply(multiply(x, sub(abs(x), 1)), add(0.2447, multiply(0.0663, abs(x)))));
const addBounds = (n: typeof Value, lowerBound: number, upperBound: number): typeof Value => min(max(n, lowerBound), upperBound);
// const circle = (x: typeof Value, radius: number, top: typeof Value): typeof Value => multiply(sqrt(sub(pow(radius, 2), pow(x, 2))), cond(top, -1, 1));

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
              set(x, add(xOffset, translationX)),
              set(y, add(yOffset, translationY)),
            ]),
            cond(eq(state, State.END), [
              set(xOffset, x),
              set(yOffset, y),
            ]),
            // TODO: fix y=0 case if y - radus = 0, α = 90 or 270
            set(α, cond(eq(y, 0), Math.PI / 2, atan(divide(x, y)))),
            set(translateX, multiply(radius, sin(α))),
            set(translateY, multiply(radius, cos(α))),
          ])
        }
      </Animated.Code>
      <PanGestureHandler onHandlerStateChange={onGestureEvent} {...{ onGestureEvent }}>
        <Animated.View>
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
          <Animated.View
            style={{
              backgroundColor: "red",
              width: 50,
              height: 50,
              transform: [
                { translateX: x },
                { translateY: y },
              ],
            }}
          />
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};
