import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

import Animated, {
  Extrapolate,
  add,
  interpolate,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  diffClamp,
  usePanGestureHandler,
  withDecay,
} from "react-native-redash";
import Card, { CARD_HEIGHT, Cards } from "../Transformations/components/Card";

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
  card: {
    marginVertical: MARGIN,
  },
});

const Wallet = () => {
  const [containerHeight, setContainerHeight] = useState(height);
  const visibleCards = Math.floor(containerHeight / HEIGHT);
  const {
    gestureHandler,
    translation,
    state,
    velocity,
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
            layout: { height },
          },
        }) => setContainerHeight(height)}
      >
        {cards.map(({ type }, index) => {
          const positionY = add(y, index * HEIGHT);
          const translateY = interpolate(y, {
            inputRange: [-HEIGHT * index, 0],
            outputRange: [-HEIGHT * index, 0],
            extrapolate: Extrapolate.CLAMP,
          });
          const scale = interpolate(positionY, {
            inputRange: [
              -HEIGHT,
              0,
              (visibleCards - 1) * HEIGHT,
              visibleCards * HEIGHT,
            ],
            outputRange: [0.8, 1, 1, 0.5],
            extrapolate: Extrapolate.CLAMP,
          });
          const translateYWithScale = interpolate(positionY, {
            inputRange: [(visibleCards - 1) * HEIGHT, visibleCards * HEIGHT],
            outputRange: [0, -HEIGHT / 4],
            extrapolate: Extrapolate.CLAMP,
          });
          const opacity = interpolate(positionY, {
            inputRange: [
              -HEIGHT,
              0,
              (visibleCards - 1) * HEIGHT,
              visibleCards * HEIGHT,
            ],
            outputRange: [0, 1, 1, 0.8],
            extrapolate: Extrapolate.CLAMP,
          });
          return (
            <Animated.View
              style={[
                styles.card,
                {
                  opacity,
                  transform: [
                    { translateY },
                    { translateY: translateYWithScale },
                    { scale },
                  ],
                },
              ]}
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
