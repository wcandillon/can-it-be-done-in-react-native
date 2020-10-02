import React from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
export const MIN_HEIGHT = 128;
export const MAX_HEIGHT = height / 2;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width,
    height: MIN_HEIGHT,
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});

export interface Item {
  title: string;
  subtitle: string;
  picture: number;
}

interface ItemProps {
  index: number;
  y: Animated.SharedValue<number>;
  item: Item;
}

const Item = ({ y, index, item: { title, subtitle, picture } }: ItemProps) => {
  const style = useAnimatedStyle(() => {
    return {
      height: index === 0 ? MAX_HEIGHT : MIN_HEIGHT,
      transform: [
        {
          translateY:
            y.value + index === 0
              ? 0
              : index * MIN_HEIGHT + (MAX_HEIGHT - MIN_HEIGHT),
        },
      ],
    };
  });
  return (
    <Animated.View style={[styles.container, style]}>
      <Image source={picture} style={styles.picture} />
    </Animated.View>
  );
};

export default Item;
