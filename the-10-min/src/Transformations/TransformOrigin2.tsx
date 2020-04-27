import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import processTransform from "./ProcessTransform";
import Card, { Cards } from "./components/Card";
import { decompose2d } from "./Matrix";

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default () => {
  const transform = [
    { translateX: 50 },
    { translateY: 50 },
    { skewX: Math.PI / 13 },
    { skewY: Math.PI / 13 },
    // { skewX: -Math.PI / 3 },
    // { skewY: -Math.PI / 3 },
    { rotateZ: Math.PI / 6 },
    { scale: 1.25 },
  ];
  console.log(
    processTransform([
      { translateX: 50 },
      { translateY: 50 },
      { skewX: `${Math.PI / 13}rad` },
      { skewY: `${Math.PI / 13}rad` },
      // { skewX: `${-Math.PI / 3}rad` },
      // { skewY: `${-Math.PI / 3}rad` },
      { rotateZ: `${Math.PI / 6}rad` },
      { scale: 1.25 },
    ])
  );
  const {
    translateX,
    translateY,
    scaleX,
    scaleY,
    skewX,
    rotateZ,
  } = decompose2d(transform);

  return (
    <>
      <View style={styles.overlay}>
        <View
          style={{
            opacity: 1,
            transform: [
              {
                matrix: processTransform([
                  { translateX: 50 },
                  { translateY: 50 },
                  { skewX: `${Math.PI / 13}rad` },
                  { skewY: `${Math.PI / 13}rad` },
                  // { skewX: `${-Math.PI / 3}rad` },
                  // { skewY: `${-Math.PI / 3}rad` },
                  { rotateZ: `${Math.PI / 6}rad` },
                  { scale: 1.25 },
                ]),
              },
            ],
          }}
        >
          <Card type={Cards.Card3} />
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
          <Card type={Cards.Card3} />
        </Animated.View>
      </View>
    </>
  );
};
