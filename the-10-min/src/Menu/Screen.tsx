import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { bInterpolate, spring } from "react-native-redash";
import Animated, {
  Clock,
  Value,
  block,
  clockRunning,
  cond,
  eq,
  not,
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

const useToggle = (
  transition: Animated.Value<number>,
  trigger: Animated.Value<0 | 1>
) => {
  const clock = new Clock();
  useCode(
    () =>
      block([
        cond(trigger, set(transition, spring({ clock, from: 0, to: 1 }))),
        cond(not(clockRunning(clock)), set(trigger, 0))
      ]),
    [clock, transition, trigger]
  );
};

export default ({ transition }: ScreenProps) => {
  const shouldOpen = new Value<0 | 1>(0);
  const borderRadius = bInterpolate(transition, 0, 20);
  useToggle(transition, shouldOpen);
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
