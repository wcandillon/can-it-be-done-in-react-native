import React, { useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";

import { PanGestureHandler } from "react-native-gesture-handler";
import {
  diffClamp,
  onScrollEvent,
  usePanGestureHandler,
  withDecay,
} from "react-native-redash";
import { CARD_HEIGHT, Cards } from "../Transformations/components/Card";
import WalletCard from "./WalletCard";

const useLazyRef = <T extends object>(initializer: () => T) => {
  const ref = useRef<T>();
  if (ref.current === undefined) {
    ref.current = initializer();
  }
  return ref.current;
};
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

const Wallet = () => {
  const y = useLazyRef(() => new Animated.Value(0));
  const onScroll = useLazyRef(() =>
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: { y },
          },
        },
      ],
      { useNativeDriver: true }
    )
  );
  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      bounces={false}
      {...{ onScroll }}
    >
      {cards.map(({ type }, index) => (
        <WalletCard key={index} {...{ index, y, type }} />
      ))}
    </Animated.ScrollView>
  );
};

export default Wallet;
