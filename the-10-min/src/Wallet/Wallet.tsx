import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

import Animated from "react-native-reanimated";

import { PanGestureHandler } from "react-native-gesture-handler";
import {
  diffClamp,
  usePanGestureHandler,
  withDecay,
} from "react-native-redash";
import { CARD_HEIGHT, Cards } from "../Transformations/components/Card";
import WalletCard from "./WalletCard";

const { height } = Dimensions.get("window");
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
    type: Cards.Card4,
  },
  {
    type: Cards.Card5,
  },
  {
    type: Cards.Card6,
  },
];
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
  },
});

const Wallet = () => {
  const [containerHeight, setContainerHeight] = useState(height);
  const visibleCards = Math.floor(containerHeight / HEIGHT);
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const y = diffClamp(
    withDecay({
      value: translation.y,
      velocity: velocity.y,
      state,
    }),
    -HEIGHT * cards.length + visibleCards * HEIGHT,
    0
  );
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={styles.container}
        onLayout={({
          nativeEvent: {
            layout: { height: h },
          },
        }) => setContainerHeight(h)}
      >
        {cards.map(({ type }, index) => (
          <WalletCard key={index} {...{ index, type, y, visibleCards }} />
        ))}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Wallet;
