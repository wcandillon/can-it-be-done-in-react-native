import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { translate, vec } from "react-native-redash";
import { Point as PointModel, SIZE } from "./ThreeDMath";

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
            transform: [...translate(vec.sub({ x, y }, SIZE / 2))],
          },
        ]}
      />
    </View>
  );
};

export default Point;
