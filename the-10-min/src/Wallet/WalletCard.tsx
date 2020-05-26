import React from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import Card, { CARD_HEIGHT, Cards } from "../Transformations/components/Card";

export const MARGIN = 16;
export const HEIGHT = CARD_HEIGHT + MARGIN * 2;
const { height: wHeight } = Dimensions.get("window");
const height = wHeight - 64;
const styles = StyleSheet.create({
  card: {
    marginVertical: MARGIN,
    alignSelf: "center",
  },
});

interface WalletCardProps {
  y: Animated.AnimatedInterpolation;
  index: number;
  type: Cards;
}

const WalletCard = ({ type, y, index }: WalletCardProps) => {
  const positionY = Animated.subtract(HEIGHT * index, y);
  const isDisappearing = -HEIGHT;
  const isTop = 0;
  const isBottom = height - HEIGHT;
  const isAppearing = height;
  const scale = positionY.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: "clamp",
  });
  const opacity = positionY.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0, 1, 1, 0],
    extrapolate: "clamp",
  });
  const translateY = Animated.add(
    Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.0001 + HEIGHT * index],
        outputRange: [0, -index * HEIGHT],
        extrapolateRight: "clamp",
      })
    ),
    positionY.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -HEIGHT / 4],
      extrapolate: "clamp",
    })
  );
  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity,
          transform: [{ translateY }, { scale }],
        },
      ]}
      key={index}
    >
      <Card {...{ type }} />
    </Animated.View>
  );
};

export default WalletCard;
