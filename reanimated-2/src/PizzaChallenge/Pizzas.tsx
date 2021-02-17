import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import Pizza from "./components/Pizza";
import Background from "./components/Background";
import { assets } from "./Config";

const { width } = Dimensions.get("window");
const pizza = [
  {
    asset: assets.pizza[0],
  },
  {
    asset: assets.pizza[1],
  },
  {
    asset: assets.pizza[2],
  },
  {
    asset: assets.pizza[3],
  },
  {
    asset: assets.pizza[4],
  },
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F5F2",
  },
});

const Pizzas = () => {
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });
  return (
    <View style={styles.container}>
      <Background x={x} />
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={width}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
        }}
        horizontal
      >
        {pizza.map(({ asset }, index) => (
          <Pizza
            id={`${index}`}
            key={index}
            x={x}
            index={index}
            asset={asset}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default Pizzas;
