import React from "react";
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
    { translateX: 0 },
    { translateY: 0 },
    { scale: 1.25 },
    { skewX: -Math.PI / 12 },
    { skewY: -Math.PI / 12 },
    { rotateZ: Math.PI / 2 },
  ];

  const {
    translateX,
    translateY,
    scaleX,
    scaleY,
    skewX,
    rotateZ,
  } = accumulatedTransform(transform);

  return (
    <>
      <View style={styles.overlay}>
        <View
          style={{
            opacity: 1,
            transform,
          }}
        >
          <Card type={Cards.Card3} />
        </View>
      </View>
      <View style={styles.overlay}>
        <Animated.View
          style={{
            opacity: 0.8,
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
