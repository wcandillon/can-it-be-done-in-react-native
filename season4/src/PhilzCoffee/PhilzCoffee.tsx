import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { interpolateColor } from "react-native-redash";

import { products } from "./Model";
import Card from "./Card";
import Products from "./Products";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

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
    return { backgroundColor };
  });
  return (
    <Animated.View style={[styles.container, style]}>
      <View>
        <Animated.ScrollView
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
        </Animated.ScrollView>
        <Products x={translateX} />
      </View>
    </Animated.View>
  );
};

export default PhilzCoffee;
