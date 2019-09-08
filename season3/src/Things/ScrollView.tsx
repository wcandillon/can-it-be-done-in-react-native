import React, { ReactNode, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { onGestureEvent, withDecay } from "react-native-redash";
import { useMemoOne } from "use-memo-one";

const { Value, diffClamp } = Animated;

interface ScrollViewProps {
  children: ReactNode;
}

export default ({ children }: ScrollViewProps) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const { translationY, velocityY, state } = useMemoOne(
    () => ({
      translationY: new Value(0),
      velocityY: new Value(0),
      state: new Value(State.UNDETERMINED)
    }),
    []
  );
  const { gestureHandler, decay } = useMemoOne(
    () => ({
      gestureHandler: onGestureEvent({
        translationY,
        velocityY,
        state
      }),
      decay: withDecay({
        value: translationY,
        velocity: velocityY,
        state
      })
    }),
    []
  );
  const lowerBound = -1 * (contentHeight - containerHeight);
  const translateY = diffClamp(decay, lowerBound, 0);
  return (
    <View
      style={{ flex: 1 }}
      onLayout={({
        nativeEvent: {
          layout: { height }
        }
      }) => setContainerHeight(height)}
    >
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            transform: [{ translateY }]
          }}
          onLayout={({
            nativeEvent: {
              layout: { height }
            }
          }) => setContentHeight(height)}
        >
          {children}
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
