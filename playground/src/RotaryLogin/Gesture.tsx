import React from "react";
import { StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import { canvas2Polar } from "react-native-redash";

import { center, RADIUS } from "./Quadrant";

const SIZE = RADIUS * 2;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  quadrant: {
    width: SIZE,
    height: SIZE,
  },
});

interface GestureProps {
  theta: Animated.SharedValue<number>;
}

const Gesture = ({ theta }: GestureProps) => {
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ translationX, translationY }) => {
      theta.value = canvas2Polar(
        { x: translationX, y: translationY },
        center
      ).theta;
    },
    onEnd: () => {
      theta.value = withSpring(0);
    },
  });
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={styles.quadrant} />
      </PanGestureHandler>
    </View>
  );
};

export default Gesture;
