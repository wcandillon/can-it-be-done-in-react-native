import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { decompose2d, tween2d, useLoop } from "react-native-redash";

import Card, { Cards } from "../Transformations/components/Card";
import { StyleGuide } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: StyleGuide.spacing * 2,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const Skew = () => {
  const transform1 = [{ scale: 0.5 }];
  const transform2 = [
    { translateX: 50 },
    { rotate: Math.PI / 2 },
    { skewY: Math.PI / 6 },
    { scale: 0.8 },
  ];
  const progress = useLoop(2000);
  const transform = tween2d(progress, transform1, transform2);
  return (
    <View style={styles.container}>
      <Text style={StyleGuide.typography.title2}>Direct Transform</Text>
      <View style={styles.content}>
        <Animated.View style={{ transform: decompose2d(transform2) }}>
          <Card type={Cards.Card1} />
        </Animated.View>
      </View>
      <Text style={StyleGuide.typography.title2}>Decomposed Transform</Text>
      <View style={styles.content}>
        <Animated.View
          style={{
            transform,
          }}
        >
          <Card type={Cards.Card1} />
        </Animated.View>
      </View>
    </View>
  );
};

export default Skew;
