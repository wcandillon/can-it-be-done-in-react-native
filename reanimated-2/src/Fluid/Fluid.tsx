import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import Slide from "./Slide";

const { width } = Dimensions.get("window");

const slides = [
  {
    color: "#3984FF",
  },
  {
    color: "#2ACEC3",
  },
  {
    color: "#FFAF6B",
  },
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    justifyContent: "center",
    alignItems: "center",
  },
});

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
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      {slides.map((slide, index) => {
        const isFirst = index === 0;
        const isLast = index === slides.length - 1;
        return (
          <View key={index} style={styles.container}>
            <Slide
              x={x}
              index={index}
              colors={[
                isFirst ? slide.color : slides[index - 1].color,
                slide.color,
                isLast ? slide.color : slides[index + 1].color,
              ]}
            />
          </View>
        );
      })}
    </Animated.ScrollView>
  );
};

export default Fluid;
