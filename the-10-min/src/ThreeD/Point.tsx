import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { Point as PointModel } from "./ThreeDMath";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  point: {
    backgroundColor: "red",
    height: 10,
    width: 10,
    borderRadius: 5,
  },
});

interface PointProps extends PointModel {
  point: {
    x: Animated.Node<number>;
    y: Animated.Node<number>;
  };
}

const Point = ({ point: { x, y } }: PointProps) => {
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.point,
          {
            transform: [{ translateX: x }, { translateY: y }],
          },
        ]}
      />
    </View>
  );
};

export default Point;
