import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { RADIUS, DELTA } from "./Quadrant";

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

interface GestureProps {}

const Gesture = ({}: GestureProps) => {
  return (
    <View style={styles.container}>
      <Animated.View style={styles.quadrant} />
    </View>
  );
};

export default Gesture;
