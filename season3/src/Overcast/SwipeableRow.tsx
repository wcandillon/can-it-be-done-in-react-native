import React, { ReactNode } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  abs,
  add,
  call,
  clockRunning,
  cond,
  divide,
  eq,
  floor,
  lessThan,
  not,
  set,
  useCode,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  RectButton,
  State,
} from "react-native-gesture-handler";
import {
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
} from "react-native-redash";

const { width } = Dimensions.get("window");
const LEFT_OPEN = 100;
const RIGHT_OPEN = -LEFT_OPEN;
const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "red",
  },
  remove: {
    width: LEFT_OPEN,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

interface SwipeableRowProps {
  children: ReactNode;
  onPress: () => void;
  onSwipe: () => void;
}

const SwipeableRow = ({ children, onPress, onSwipe }: SwipeableRowProps) => {
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const clock = useClock();
  const offsetX = useValue(0);
  const translateX = useValue(0);
  const to = snapPoint(translateX, velocity.x, [
    0,
    cond(lessThan(translateX, 0), RIGHT_OPEN, LEFT_OPEN),
    cond(lessThan(translateX, 0), -width, width),
  ]);
  useCode(
    () => [
      cond(eq(state, State.ACTIVE), [
        set(translateX, add(offsetX, translation.x)),
      ]),
      cond(eq(state, State.END), [
        set(translateX, timing({ clock, from: translateX, to })),
        set(offsetX, translateX),
        cond(not(clockRunning(clock)), [
          cond(eq(abs(translateX), width), call([], onSwipe)),
        ]),
      ]),
    ],
    []
  );
  return (
    <View>
      <View style={styles.background}>
        <RectButton {...{ onPress }}>
          <View style={styles.remove}>
            <Text>Remove</Text>
          </View>
        </RectButton>
      </View>
      <PanGestureHandler failOffsetY={5} {...gestureHandler}>
        <Animated.View style={{ transform: [{ translateX }] }}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default SwipeableRow;
