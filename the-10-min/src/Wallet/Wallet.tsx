import React from "react";
import { StyleSheet, View } from "react-native";

import Animated, { Extrapolate, interpolate } from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  diffClamp,
  usePanGestureHandler,
  withOffset,
} from "react-native-redash";
import Card, { CARD_HEIGHT, Cards } from "../Transformations/components/Card";

const MARGIN = 16;
const HEIGHT = CARD_HEIGHT + MARGIN * 2;
const cards = [
  {
    type: Cards.Card1,
  },
  {
    type: Cards.Card2,
  },
  {
    type: Cards.Card3,
  },
  {
    type: Cards.Card1,
  },
  {
    type: Cards.Card2,
  },
  {
    type: Cards.Card3,
  },
];
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
  },
  card: {
    marginVertical: MARGIN,
  },
});

const Wallet = () => {
  const { gestureHandler, translation, state } = usePanGestureHandler();
  const y = diffClamp(
    withOffset(translation.y, state),
    -CARD_HEIGHT * cards.length,
    0
  );
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={styles.container}>
        {cards.map(({ type }, index) => {
          const translateY = interpolate(y, {
            inputRange: [-CARD_HEIGHT * index, 0],
            outputRange: [-CARD_HEIGHT * index, 0],
            extrapolate: Extrapolate.CLAMP,
          });
          return (
            <Animated.View
              style={[styles.card, { transform: [{ translateY }] }]}
              key={index}
            >
              <Card {...{ type }} />
            </Animated.View>
          );
        })}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Wallet;
