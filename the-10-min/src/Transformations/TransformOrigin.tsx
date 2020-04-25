import React from "react";
import { StyleSheet, View } from "react-native";
import Unmatrix from "unmatrix";

import Animated, { debug, useCode } from "react-native-reanimated";
import Card, { CARD_WIDTH, Cards } from "./components/Card";
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
    { skewX: -Math.PI / 6 },
    { translateX: -CARD_WIDTH / 2 },
    { rotateZ: -Math.PI / 6 },
    { translateX: CARD_WIDTH / 2 },
    { skewY: Math.PI / 6 },
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
        <Animated.View
          style={{
            opacity: 1,
            transform,
          }}
        >
          <Card type={Cards.Card1} />
        </Animated.View>
      </View>
      <View style={styles.overlay}>
        <Animated.View
          style={{
            opacity: 0.8,
            transform: [
              { translateY },
              { translateX },
              { rotateZ },
              { skewX },
              { scaleX },
              { scaleY },
            ],
          }}
        >
          <Card type={Cards.Card2} />
        </Animated.View>
      </View>
    </>
  );
};
