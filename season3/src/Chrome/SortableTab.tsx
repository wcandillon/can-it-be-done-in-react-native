import React from "react";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { panGestureHandler, timing } from "react-native-redash";
import { useMemoOne } from "use-memo-one";
import Tab, { TabProps } from "./Tab";

const {
  eq,
  cond,
  useCode,
  add,
  divide,
  floor,
  neq,
  call,
  max,
  sub,
  multiply,
  block,
  set,
  and
} = Animated;

export const withSnap = ({
  value,
  snapTo,
  state
}: {
  value: Animated.Value<number>;
  state: Animated.Value<State>;
  snapTo: Animated.Adaptable<number>;
}) => {
  return block([
    cond(
      eq(state, State.ACTIVE),
      value,
      timing({
        from: value,
        to: snapTo,
        duration: 200
      })
    )
  ]);
};

interface SortableCardProps extends TabProps {
  height: number;
  index: number;
  offset: number;
  onChange: (oldIndex: number, newIndex: number) => void;
  onRelease: () => void;
  activeTab: Animated.Value<number>;
}

export default ({
  tab,
  height,
  onChange,
  index,
  offset,
  onRelease,
  activeTab
}: SortableCardProps) => {
  const { gestureHandler, translationX, translationY, state } = useMemoOne(
    () => panGestureHandler(),
    []
  );
  const zIndex = cond(eq(state, State.ACTIVE), 100, 1);
  const y = add(translationY, offset);
  // We use max(0) because of https://github.com/kmagiera/react-native-reanimated/pull/362
  const currentIndex = max(floor(divide(y, height)), 0);
  const translateX = withSnap({
    value: translationX,
    state,
    snapTo: 0
  });
  const snapTo = sub(multiply(currentIndex, height), offset);
  const translateY = withSnap({
    value: translationY,
    state,
    snapTo
  });
  useCode(
    block([
      cond(
        and(neq(currentIndex, index), eq(state, State.ACTIVE)),
        call([currentIndex], ([newIndex]) => onChange(index, newIndex))
      ),
      cond(
        and(eq(state, State.END), eq(translateY, snapTo)),
        call([], onRelease)
      )
    ]),
    [index]
  );
  useCode(block([cond(eq(state, State.ACTIVE), set(activeTab, tab.id))]), []);
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          opacity: cond(eq(activeTab, tab.id), 0.7, 0),
          zIndex,
          transform: [{ translateX }, { translateY }]
        }}
      >
        <Tab {...{ tab }} />
      </Animated.View>
    </PanGestureHandler>
  );
};
