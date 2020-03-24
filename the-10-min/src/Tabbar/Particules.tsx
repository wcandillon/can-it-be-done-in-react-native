import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  add,
  and,
  divide,
  interpolate,
  multiply,
  neq,
} from "react-native-reanimated";
import { withSpringTransition } from "react-native-redash";
import { Colors, ICON_SIZE, PADDING, SEGMENT } from "./icons/Constants";

interface PariculesProps {
  transition: Animated.Node<number>;
  activeTransition: Animated.Node<number>;
}

const size = 6;
const topParticules = [0, 1, 2];
const bottomParticules = [0, 1];
const HEIGHT = ICON_SIZE + PADDING * 2;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
  },
  particules: {
    justifyContent: "center",
    height: HEIGHT,
  },

  particule: {
    backgroundColor: Colors.primary,
    position: "absolute",
    left: 0,
    top: 0,
    width: size,
    height: size,
    borderRadius: size / 2,
  },
});

export default ({ transition, activeTransition }: PariculesProps) => {
  const middle = HEIGHT / 2 - size / 2;
  const x = add(multiply(transition, SEGMENT), SEGMENT / 2 - size / 2);
  const top = interpolate(activeTransition, {
    inputRange: [0, 0.5, 1],
    outputRange: [middle, PADDING / 2, middle],
  });
  const bottom = interpolate(activeTransition, {
    inputRange: [0, 0.5, 1],
    outputRange: [middle, HEIGHT - PADDING / 2, middle],
  });
  const s = interpolate(activeTransition, {
    inputRange: [0, 0.5, 1],
    outputRange: [0.75, 1, 0.75],
  });
  const opacity = and(neq(activeTransition, 0), neq(activeTransition, 1));
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.particules}>
        {topParticules.map((particule) => {
          const subParticules = topParticules.slice(0, particule);
          const translateX = subParticules.reduce(
            (acc) => withSpringTransition(acc),
            x
          );
          const translateY = subParticules.reduce(
            (acc) => withSpringTransition(acc),
            top
          );
          const scale = subParticules.reduce(
            (acc) => withSpringTransition(acc),
            s
          );
          return (
            <Animated.View
              key={particule}
              style={[
                styles.particule,
                {
                  opacity,
                  transform: [{ translateX }, { translateY }, { scale }],
                },
              ]}
            />
          );
        })}
        {bottomParticules.map((particule) => {
          const subParticules = bottomParticules.slice(0, particule);
          const translateX = subParticules.reduce(
            (acc) => withSpringTransition(acc),
            divide(add(x, withSpringTransition(x)), 2)
          );
          const translateY = subParticules.reduce(
            (acc) => withSpringTransition(acc),
            divide(add(bottom, withSpringTransition(bottom)), 2)
          );
          const scale = subParticules.reduce(
            (acc) => withSpringTransition(acc),
            divide(add(s, withSpringTransition(s)), 2)
          );
          return (
            <Animated.View
              key={particule}
              style={[
                styles.particule,
                {
                  opacity,
                  transform: [{ translateX }, { translateY }, { scale }],
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};
