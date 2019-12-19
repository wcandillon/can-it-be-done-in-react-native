import React from "react";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { moving, panGestureHandler } from "react-native-redash";
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
  divide,
  and,
  Clock,
  round,
  spring,
  startClock
} = Animated;

export const withOffset = ({
  offset,
  value,
  state: gestureState
}: {
  offset: Animated.Adaptable<number>;
  value: Animated.Value<number>;
  state: Animated.Value<State>;
}) => {
  const safeOffset = new Value(0);
  return cond(
    eq(gestureState, State.ACTIVE),
    add(safeOffset, value),
    set(safeOffset, offset)
  );
};

export const withTransition = (
  value: Animated.Node<number>,
  velocity: Animated.Value<number>,
  gestureState: Animated.Value<State>
) => {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  };
  const config = {
    toValue: new Value(0),
    damping: 15,
    mass: 1,
    stiffness: 150,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 1
  };
  return block([
    startClock(clock),
    set(config.toValue, value),
    cond(
      eq(gestureState, State.ACTIVE),
      [set(state.velocity, velocity), set(state.position, value)],
      spring(clock, state, config)
    ),
    state.position
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
    velocityX,
    translationY,
    velocityY
  } = panGestureHandler();
  const currentOffset = offsets[index];
  const x = withOffset({
    value: translationX,
    offset: currentOffset.x,
    state
  });
  const y = withOffset({
    value: translationY,
    offset: currentOffset.y,
    state
  });
  const zIndex = cond(eq(state, State.ACTIVE), 200, cond(moving(y), 100, 1));
  const offsetX = multiply(round(divide(x, TAB_SIZE)), TAB_SIZE);
  const offsetY = multiply(round(divide(y, TAB_SIZE)), TAB_SIZE);
  const translateX = withTransition(x, velocityX, state);
  const translateY = withTransition(y, velocityY, state);
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
