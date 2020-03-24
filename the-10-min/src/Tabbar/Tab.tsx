import React, { ReactElement, cloneElement } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Animated, {
  cond,
  eq,
  greaterThan,
  interpolate,
} from "react-native-reanimated";
import { withTransition } from "react-native-redash";
import { DURATION, ICON_SIZE } from "./icons/Constants";

interface TabProps {
  children: ReactElement;
  onPress: () => void;
  active: Animated.Node<number>;
  transition: Animated.Node<number>;
  index: number;
}

const styles = StyleSheet.create({
  icon: {
    overflow: "hidden",
  },
});

export default ({ children, active, transition, index, onPress }: TabProps) => {
  const isActive = eq(active, index);
  const activeTransition = withTransition(isActive, { duration: DURATION });
  const isGoingLeft = greaterThan(transition, active);
  const width = interpolate(activeTransition, {
    inputRange: [0, 1],
    outputRange: [0, ICON_SIZE],
  });
  const direction = cond(
    isActive,
    cond(isGoingLeft, "rtl", "ltr"),
    cond(isGoingLeft, "ltr", "rtl")
  );
  return (
    <TouchableWithoutFeedback {...{ onPress }}>
      <Animated.View
        style={{
          direction,
          width: ICON_SIZE,
          height: ICON_SIZE,
        }}
      >
        <View style={StyleSheet.absoluteFill}>{children}</View>
        <Animated.View style={[styles.icon, { width }]}>
          {cloneElement(children, { active: true })}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
