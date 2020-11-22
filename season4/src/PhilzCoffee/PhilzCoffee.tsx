import React, { useRef } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { interpolateColor } from "react-native-redash";
import { PanGestureHandler, ScrollView } from "react-native-gesture-handler";

import { products } from "./Model";
import Card, { CARD_HEIGHT } from "./Card";
import Products from "./Products";
import Cards from "./components/Cards";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const { width, height } = Dimensions.get("window");

const PhilzCoffee = () => {
  const translateX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    },
  });
  const style = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      products.map((_, i) => width * i),
      products.map((product) => product.color2)
    );
    return { flex: 1, backgroundColor };
  });
  return (
    <Animated.View style={style}>
      <ScrollView
        bounces={false}
        showsHorizontalScrollIndicator={false}
        snapToOffsets={[0, CARD_HEIGHT]}
        snapToEnd={false}
        decelerationRate="fast"
      >
        <View style={[{ height: CARD_HEIGHT }]}>
          <AnimatedScrollView
            onScroll={onScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={width}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {products.map((product, index) => (
              <Card product={product} key={index} />
            ))}
          </AnimatedScrollView>
          <Products x={translateX} />
        </View>
        <Cards />
      </ScrollView>
    </Animated.View>
  );
};

export default PhilzCoffee;
