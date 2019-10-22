import React from "react";
import { View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { panGestureHandler } from "react-native-redash";
import Tab, { TAB_SIZE, TabProps } from "./Tab";

const {
  Value,
  add,
  cond,
  eq,
  block,
  set,
  useCode,
  multiply,
  floor,
  divide,
  max,
  and,
  Clock,
  timing,
  clockRunning,
  stopClock,
  startClock,
  not,
  neq
} = Animated;
const withSnap = ({
  value,
  offset,
  state: gestureState
}: {
  value: Animated.Value<number>;
  offset: Animated.Value<number>;
  state: Animated.Value<State>;
}) => {
  const clock = new Clock();
  const state = {
    position: new Value(0),
    finished: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };
  const config = {
    toValue: new Value(0),
    duration: 250,
    easing: Easing.linear
  };
  const position = new Value(0);
  const safeOffset = new Value(0);
  return block([
    cond(eq(gestureState, State.ACTIVE), set(position, value)),
    cond(and(neq(gestureState, State.ACTIVE), not(clockRunning(clock))), [
      set(config.toValue, offset),
      set(state.position, add(safeOffset, position)),
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      startClock(clock),
      set(position, 0)
    ]),
    cond(
      clockRunning(clock),
      [
        timing(clock, state, config),
        cond(eq(state.finished, 1), [
          set(safeOffset, state.position),
          stopClock(clock)
        ]),
        state.position
      ],
      [add(safeOffset, value)]
    )
  ]);
};

interface SortableCardProps extends TabProps {
  index: number;
  offsets: { x: Animated.Value<number>; y: Animated.Value<number> }[];
}

export default ({ tab, offsets, index }: SortableCardProps) => {
  const {
    gestureHandler,
    state,
    translationX,
    translationY
  } = panGestureHandler();
  const zIndex = cond(eq(state, State.ACTIVE), 10, 1);
  const currentOffset = offsets[index];
  const translateX = withSnap({
    value: translationX,
    offset: currentOffset.x,
    state
  });
  const translateY = withSnap({
    value: translationY,
    offset: currentOffset.y,
    state
  });
  const offsetX = multiply(
    max(floor(divide(translateX, TAB_SIZE)), 0),
    TAB_SIZE
  );
  const offsetY = multiply(
    max(floor(divide(translateY, TAB_SIZE)), 0),
    TAB_SIZE
  );
  useCode(
    block(
      offsets.map(offset =>
        cond(
          and(
            eq(offsetX, offset.x),
            eq(offsetY, offset.y),
            eq(state, State.ACTIVE)
          ),
          [
            set(offset.x, currentOffset.x),
            set(offset.y, currentOffset.y),
            set(currentOffset.x, offsetX),
            set(currentOffset.y, offsetY)
          ]
        )
      )
    ),
    []
  );
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: TAB_SIZE,
          height: TAB_SIZE,
          justifyContent: "center",
          alignItems: "center",
          transform: [{ translateX }, { translateY }],
          zIndex
        }}
      >
        <Tab {...{ tab }} />
      </Animated.View>
    </PanGestureHandler>
  );
};
