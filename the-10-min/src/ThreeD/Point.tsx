import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { add, divide, sub } from "react-native-reanimated";

import { vec } from "react-native-redash";
import { processTransform } from "./Matrix4";
import { Point as PointModel, SIZE, matrixVecMul } from "./ThreeDMath";

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
            transform: [
              { translateX: sub(x, SIZE / 2) },
              { translateY: sub(y, SIZE / 2) },
            ],
          },
        ]}
      />
    </View>
  );
};

export default Point;
