import * as React from "react";
import { DangerZone, GestureHandler } from "expo";
import { StyleSheet } from "react-native";
import { number } from "prop-types";

const { Animated } = DangerZone;
const {
  Value, event, block, cond, eq, set, add, sqrt, neq, pow, sub, min, max, and, debug, greaterThan, lessOrEq, multiply, lessThan, divide, sin, cos, abs,
} = Animated;
const { PanGestureHandler, State } = GestureHandler;
const atan = (x: typeof Value): typeof Value => sub(multiply(Math.PI / 4, x), multiply(multiply(x, sub(abs(x), 1)), add(0.2447, multiply(0.0663, abs(x)))));
// https://en.wikipedia.org/wiki/Atan2
const atan2 = (y: typeof Value, x: typeof Value) => {
  const expA = add(sqrt(add(pow(x, 2), pow(y, 2))), x);
  const expB = sub(sqrt(add(pow(x, 2), pow(y, 2))), x);
  const cond1 = greaterThan(x, 0);
  const exp1 = multiply(2, atan(divide(y, expA)));
  const cond2 = and(lessOrEq(x, 0), neq(y, 0));
  const exp2 = multiply(2, atan(divide(expB, y)));
  const cond3 = and(lessThan(x, 0), eq(y, 0));
  const exp3 = new Value(Math.PI);
  return cond(
    cond1, exp1,
    cond(cond2, exp2,
      cond(cond3, exp3, new Value(0))),
  );
};
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
            debug("α", α),
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
            set(translateY, add(multiply(-1 * radius, cos(α)), radius)),
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
