import * as React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { translateZ } from "react-native-redash";

const { interpolate, Extrapolate, multiply, sin, abs } = Animated;
const { width } = Dimensions.get("window");
const ratio = 863 / 609;
export const CARD_WIDTH = width;
export const CARD_HEIGHT = CARD_WIDTH * ratio;

interface FaceProps {
  scale: Animated.Node<number>;
  isOnTop?: boolean;
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});

export default ({ scale, isOnTop }: FaceProps) => {
  const perspective = CARD_HEIGHT;
  const inputRange = [0.5, 1];
  const opacity = interpolate(scale, {
    inputRange,
    outputRange: [isOnTop ? 0.6 : 0.5, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const rotateX = interpolate(scale, {
    inputRange,
    outputRange: [isOnTop ? Math.PI / 2 : -Math.PI / 2, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const x = multiply(-CARD_HEIGHT / 2, sin(abs(rotateX)));
  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        transform: [{ perspective }, { rotateX }, translateZ(perspective, x)],
      }}
    >
      <Image
        source={require("../assets/queen-of-spade.png")}
        style={styles.image}
      />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity,
          backgroundColor: "black",
        }}
      />
    </Animated.View>
  );
};
