import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";

import Animated from "react-native-reanimated";
import Card, { Cards } from "./components/Card";
import { accumulatedTransform } from "./Matrix";

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default () => {
  const transform = [
    { skewX: Math.PI / 12 },
    { skewY: Math.PI / 12 },
    { translateX: 50 },
    { translateY: 50 },
  ];
  const m = [
    [1, Math.tan(Math.PI / 12), 0, 50],
    [Math.tan(Math.PI / 12), 1, 0, 50],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];
  const matrix = [
    m[0][0],
    m[1][0],
    m[2][0],
    m[3][0],

    m[0][1],
    m[1][1],
    m[2][1],
    m[3][1],

    m[0][2],
    m[1][2],
    m[2][2],
    m[3][2],

    m[0][3],
    m[1][3],
    m[2][3],
    m[3][3],
  ];
  const {
    translateX,
    translateY,
    scaleX,
    scaleY,
    skewX,
    rotateZ,
  } = accumulatedTransform([
    { skewX: Math.PI / 12 },
    { skewY: Math.PI / 12 },
    { translateX: 50 },
    { translateY: 50 },
  ]);

  return (
    <>
      <View style={styles.overlay}>
        <View
          style={{
            opacity: 1,
            transform,
          }}
        >
          <Card type={Cards.Card1} />
        </View>
      </View>
      <View style={styles.overlay}>
        <Animated.View
          style={{
            opacity: 0.5,
            transform: [
              { translateY },
              { translateX },
              { rotateZ: skewX },
              { scaleX },
              { scaleY },
              { rotateZ },
            ],
          }}
        >
          <Card type={Cards.Card2} />
        </Animated.View>
      </View>
    </>
  );
};
