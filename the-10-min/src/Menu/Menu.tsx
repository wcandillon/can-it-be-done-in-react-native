import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import { bInterpolate, useTransition } from "react-native-redash";
import Animated from "react-native-reanimated";
import Screen from "./Screen";
import Profile from "./Profile";

const { width } = Dimensions.get("window");
const perspective = { perspective: 1000 };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center"
  }
});

export default () => {
  const [open, setOpen] = useState(false);
  const transition = useTransition(open);
  const rotateY = bInterpolate(transition, 0, -Math.PI / 4);
  const scale = bInterpolate(transition, 1, 0.9);
  const opacity = bInterpolate(transition, 0, 0.5);
  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          flex: 1,
          transform: [
            perspective,
            { translateX: width / 2 },
            { rotateY },
            { translateX: -width / 2 },
            { scale }
          ]
        }}
      >
        <Screen onPress={() => setOpen(prev => !prev)} />
        <Animated.View
          pointerEvents="none"
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "black",
            opacity
          }}
        />
      </Animated.View>
      <View style={styles.layer} pointerEvents="none">
        <Profile {...{ transition }} />
      </View>
    </View>
  );
};
