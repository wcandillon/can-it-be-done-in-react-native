import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { add, sub } from "react-native-reanimated";
import { polar2Canvas } from "react-native-redash";

const lRadius = 10;
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
  },
  line: {
    width: "100%",
    height: 3,
    backgroundColor: "black",
  },
  circle: {
    width: lRadius * 2,
    height: lRadius * 2,
    borderRadius: lRadius,
    borderColor: "black",
    borderWidth: 3,
  },
});

interface LineProps {
  theta: Animated.Node<number>;
  radius: number;
  rotate: number;
  color: string;
}

const Line = ({ theta, radius, rotate, color }: LineProps) => {
  const { x } = polar2Canvas(
    { theta: add(theta, rotate), radius },
    { x: radius, y: radius }
  );
  return (
    <>
      <Animated.View style={[styles.overlay, { transform: [{ rotate }] }]}>
        <View style={styles.line} />
      </Animated.View>
      <Animated.View
        style={[styles.overlay, { transform: [{ rotate }], zIndex: 100 }]}
      >
        <Animated.View
          style={[
            styles.circle,
            {
              backgroundColor: color,
              transform: [{ translateX: sub(x, lRadius) }],
            },
          ]}
        />
      </Animated.View>
    </>
  );
};

export default Line;
