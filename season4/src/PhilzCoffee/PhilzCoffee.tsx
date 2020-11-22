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
import Card from "./Card";
import Products from "./Products";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width,
    height: height,
  },
  page: {
    width,
    height,
  },
});

const PhilzCoffee = () => {
  const pan = useRef<PanGestureHandler>(null);
  const scrollViewH = useRef<Animated.ScrollView>(null);
  const scrollViewV = useRef<ScrollView>(null);
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
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      console.log("Start");
    },
    onEnd: () => {
      console.log("End");
    },
  });
  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={{ backgroundColor: "green" }}
      showsHorizontalScrollIndicator
      snapToOffsets={[0, height * 0.61]}
      snapToEnd={false}
      decelerationRate="fast"
    >
      <Animated.View style={[style]}>
        <View style={[{ height: height * 0.61 }]}>
          <AnimatedScrollView
            waitFor={pan}
            onScroll={onScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={width}
            horizontal
            showsHorizontalScrollIndicator
            directionalLockEnabled
          >
            {products.map((product, index) => (
              <Card product={product} key={index} />
            ))}
          </AnimatedScrollView>
          <Products x={translateX} />
        </View>
      </Animated.View>
      <View style={[{ backgroundColor: "green" }]}>
        <View
          style={{
            width: 300,
            height: 300,
            backgroundColor: "red",
            margin: 16,
          }}
        />
        <View
          style={{
            width: 300,
            height: 300,
            backgroundColor: "red",
            margin: 16,
          }}
        />
        <View
          style={{
            width: 300,
            height: 300,
            backgroundColor: "red",
            margin: 16,
          }}
        />
        <View
          style={{
            width: 300,
            height: 300,
            backgroundColor: "red",
            margin: 16,
          }}
        />
        <View
          style={{
            width: 300,
            height: 300,
            backgroundColor: "red",
            margin: 16,
          }}
        />
        <View
          style={{
            width: 300,
            height: 300,
            backgroundColor: "red",
            margin: 16,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default PhilzCoffee;
