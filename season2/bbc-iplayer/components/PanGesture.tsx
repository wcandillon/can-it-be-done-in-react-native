import * as React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { onGestureEvent, decay } from "react-native-redash";
import { State, PanGestureHandler } from "react-native-gesture-handler";

const { Value, useCode, set } = Animated;

interface PanGestureProps {
  translateX: Animated.Value<number>;
}

export default ({ translateX }: PanGestureProps) => {
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureEvent = onGestureEvent({
    translationX,
    velocityX,
    state
  });
  const translateXNode = decay(translationX, state, velocityX);
  useCode(set(translateX, translateXNode), []);
  return (
    <PanGestureHandler {...gestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};
