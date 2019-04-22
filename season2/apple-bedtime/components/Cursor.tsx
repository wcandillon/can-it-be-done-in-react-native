import * as React from "react";
import { DangerZone, GestureHandler } from "expo";
import { StyleSheet } from "react-native";
import { atan2 } from "./Math";

const { Animated } = DangerZone;
const {
  Value, event, block, cond, eq, set, add, sub, debug, multiply, sin, cos,
} = Animated;
const { PanGestureHandler, State } = GestureHandler;

// const addBounds = (n: typeof Value, lowerBound: number, upperBound: number): typeof Value => min(max(n, lowerBound), upperBound);
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
            debug("α", α),
            debug("y", y),
            debug("x", x),
            debug("translateX", translateX),
            debug("translateY", translateY),
            cond(eq(state, State.ACTIVE), [
              set(x, add(xOffset, translationX)),
              set(y, add(yOffset, translationY)),
            ]),
            cond(eq(state, State.END), [
              set(xOffset, x),
              set(yOffset, y),
            ]),
            set(α, atan2(sub(y, radius), sub(x, radius))),
            set(translateX, add(multiply(radius, sin(α)), radius)),
            set(translateY, add(multiply(radius, cos(α)), radius)),
          ])
        }
      </Animated.Code>
      <PanGestureHandler onHandlerStateChange={onGestureEvent} {...{ onGestureEvent }}>
        <Animated.View style={StyleSheet.absoluteFillObject}>
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
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
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
