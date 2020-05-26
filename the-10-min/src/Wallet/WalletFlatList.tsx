import React from "react";
import { Animated, FlatList } from "react-native";

import { Cards } from "../Transformations/components/Card";
import WalletCard from "./WalletCard";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

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
  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });
  return (
    <AnimatedFlatList
      scrollEventThrottle={16}
      bounces={false}
      data={cards}
      renderItem={({ index, item: { type } }) => (
        <WalletCard {...{ index, y, type }} />
      )}
      keyExtractor={(item) => item.index}
      {...{ onScroll }}
    />
  );
};

export default Wallet;
