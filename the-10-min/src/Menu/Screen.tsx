import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { bInterpolate } from "react-native-redash";
import Animated, { Value } from "react-native-reanimated";
import { useToggle } from "./AnimatedHelpers";
import { State } from "./Constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#F6F5F9"
  },
  button: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 20,
    padding: 16
  },
  label: {
    fontSize: 16,
    fontWeight: "500"
  }
});

interface ScreenProps {
  state: Animated.Value<State>;
  transition: Animated.Node<number>;
}

export default ({ state, transition }: ScreenProps) => {
  const borderRadius = bInterpolate(transition, 0, 20);
  return (
    <Animated.View style={[styles.container, { borderRadius }]}>
      <TouchableOpacity onPress={() => state.setValue(State.OPENING)}>
        <View style={styles.button}>
          <Text style={styles.label}>Show Menu</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
