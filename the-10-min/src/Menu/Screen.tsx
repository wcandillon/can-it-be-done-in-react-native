import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { bInterpolate, timing } from "react-native-redash";
import Animated, {
  Value,
  block,
  cond,
  eq,
  set,
  useCode
} from "react-native-reanimated";

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
  transition: Animated.Value<number>;
}

export default ({ transition }: ScreenProps) => {
  const shouldOpen = new Value<0 | 1>(0);
  const borderRadius = bInterpolate(transition, 0, 20);
  useCode(
    () =>
      block([
        cond(shouldOpen, set(transition, timing({ from: 0, to: 1 }))),
        cond(eq(transition, 1), set(shouldOpen, 0))
      ]),
    [shouldOpen, transition]
  );
  return (
    <Animated.View style={[styles.container, { borderRadius }]}>
      <TouchableOpacity onPress={() => shouldOpen.setValue(1)}>
        <View style={styles.button}>
          <Text style={styles.label}>Show Menu</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
