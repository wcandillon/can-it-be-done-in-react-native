import React from "react";
import { StyleSheet, Image, View, Dimensions } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "@react-navigation/native";

import { assets, BREAD_PADDING, PIZZA_SIZE } from "../Config";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: width,
    alignItems: "center",
  },
  pizza: {
    width: PIZZA_SIZE,
    height: PIZZA_SIZE,
  },
  plate: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  bread: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    top: BREAD_PADDING,
    left: BREAD_PADDING,
    right: BREAD_PADDING,
    bottom: BREAD_PADDING,
  },
});

interface PizzaProps {
  id: string;
  index: number;
  x: Animated.SharedValue<number>;
  asset: ReturnType<typeof require>;
}

const Pizza = ({ id, x, index, asset }: PizzaProps) => {
  const { navigate } = useNavigation();
  const style = useAnimatedStyle(() => {
    const translateX = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [-width / 2, 0, width / 2]
    );
    const translateY = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [PIZZA_SIZE / 2, 0, PIZZA_SIZE / 2],
      Extrapolate.CLAMP
    );
    const scale = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.2, 1, 0.2],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateX }, { translateY }, { scale }],
    };
  });
  const plateStyle = useAnimatedStyle(() => ({
    opacity: x.value % width === 0 ? 1 : 0,
  }));
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigate("Pizza", { id })}>
        <SharedElement id={id}>
          <Animated.View style={[styles.pizza, style]}>
            <Animated.Image
              source={assets.plate}
              style={[styles.plate, plateStyle]}
            />
            <Image source={asset} style={styles.bread} />
          </Animated.View>
        </SharedElement>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Pizza;
