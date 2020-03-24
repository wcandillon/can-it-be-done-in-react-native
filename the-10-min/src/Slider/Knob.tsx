import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { eq, not } from "react-native-reanimated";
import { State } from "react-native-gesture-handler";

interface KnobProps {
  state: Animated.Node<State>;
}

export const KNOB_SIZE = 75;

const styles = StyleSheet.create({
  container: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});

export default ({ state }: KnobProps) => {
  const opacity = eq(state, State.ACTIVE);
  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.image, { opacity: not(opacity) }]}
        source={require("./assets/down.png")}
      />
      <Animated.Image
        style={[styles.image, { opacity }]}
        source={require("./assets/up.png")}
      />
    </View>
  );
};
