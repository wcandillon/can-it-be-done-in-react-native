import React, { ReactNode } from "react";
import Animated, { Easing } from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import {
  onGestureEvent,
  contains,
  runTiming,
  runDelay
} from "react-native-redash";

interface TapHandlerProps {
  value: Animated.Value<number>;
  onPress: () => void;
  children: ReactNode;
}

const {
  Value,
  Clock,
  useCode,
  block,
  cond,
  eq,
  set,
  call,
  onChange
} = Animated;
const { BEGAN, FAILED, CANCELLED, END, UNDETERMINED } = State;

export default ({ onPress, children, value }: TapHandlerProps) => {
  const clock = new Clock();
  const shouldSpring = new Value(-1);
  const state = new Value(UNDETERMINED);
  const gestureHandler = onGestureEvent({ state });
  useCode(
    block([
      cond(eq(state, BEGAN), set(shouldSpring, 1)),
      cond(contains([FAILED, CANCELLED], state), set(shouldSpring, 0)),
      onChange(state, cond(eq(state, END), call([], onPress))),
      cond(eq(state, END), [runDelay(set(shouldSpring, 0), 250)]),
      cond(
        eq(shouldSpring, 1),
        set(
          value,
          runTiming(clock, value, {
            toValue: 1,
            duration: 250,
            easing: Easing.inOut(Easing.ease)
          })
        )
      ),
      cond(
        eq(shouldSpring, 0),
        set(
          value,
          runTiming(clock, value, {
            toValue: 0,
            duration: 250,
            easing: Easing.inOut(Easing.ease)
          })
        )
      )
    ]),
    []
  );
  return (
    <TapGestureHandler {...gestureHandler}>
      <Animated.View>{children}</Animated.View>
    </TapGestureHandler>
  );
};
