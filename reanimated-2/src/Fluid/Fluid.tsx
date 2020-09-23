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
    picture: require("./assets/1.png"),
    aspectRatio: 439.75 / 470.5,
  },
  {
    color: "#39ffb4",
    picture: require("./assets/2.png"),
    aspectRatio: 400.5 / 429.5,
  },
  {
    color: "#ffb439",
    picture: require("./assets/4.png"),
    aspectRatio: 391.25 / 520,
  },
];
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
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
    <View style={styles.root}>
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
                aspectRatio={slide.aspectRatio}
                picture={slide.picture}
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
    </View>
  );
};

export default Fluid;
