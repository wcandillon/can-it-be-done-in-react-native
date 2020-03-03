import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { eq, sub } from "react-native-reanimated";
import { withTransition } from "react-native-redash";
import { Colors, ICON_SIZE, PADDING } from "./icons/Constants";

interface WeaveProps {
  active: Animated.Node<number>;
  index: number;
}

const SIZE = ICON_SIZE + PADDING * 2;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  },
  weave: {
    borderRadius: SIZE / 2,
    width: SIZE,
    height: SIZE,
    borderWidth: 4,
    borderColor: Colors.primary
  }
});

export default ({ active, index }: WeaveProps) => {
  const isActive = eq(active, index);
  const activeTransition = withTransition(isActive, { duration: 250 });
  const scale = activeTransition;
  const opacity = sub(1, activeTransition);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.weave, { opacity, transform: [{ scale }] }]}
      />
    </View>
  );
};
