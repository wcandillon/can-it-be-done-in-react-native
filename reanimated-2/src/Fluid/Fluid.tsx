import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import Slide from "./Slide";

const { width } = Dimensions.get("window");

const slides = [{}, {}, {}];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    justifyContent: "center",
    alignItems: "center",
  },
});

/*
https://spencermortensen.com/articles/bezier-circle/

P0 = (0, 1), P1 = (C, 1), P2 = (1, C), P3 = (1, 0)
P0 = (1, 0), P1 = (1, -C), P2 = (C, -1), P3 = (0, -1)
P0 = (0, -1), P1 = (-C, -1), P2 = (-1, -C), P4 = (-1, 0)
P0 = (-1, 0), P1 = (-1, C), P2 = (-C, 1), P3 = (0, 1)
*/

const Fluid = () => {
  const x = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });
  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      snapToInterval={width}
      decelerationRate="fast"
      bounces={false}
      horizontal
    >
      {slides.map((_slide, index) => (
        <View key={index} style={styles.container}>
          <Slide x={x} index={index} />
        </View>
      ))}
    </Animated.ScrollView>
  );
};

export default Fluid;
