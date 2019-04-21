import * as React from "react";
import { DangerZone, GestureHandler } from "expo";
import { StyleSheet } from "react-native";

const { Animated } = DangerZone;
const {
  Value, event, block, cond, eq, set, add,
} = Animated;
const { PanGestureHandler, State } = GestureHandler;

interface CursorProps {}

export default () => {
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
            set(translateX, x),
            set(translateY, y),
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
