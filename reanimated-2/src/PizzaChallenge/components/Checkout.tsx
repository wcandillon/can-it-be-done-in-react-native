import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { mix } from "react-native-redash";

const SIZE = 20;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "flex-end",
    padding: 16,
  },
  bubble: {
    color: "white",
  },
});

interface CheckoutProps {
  active: boolean;
}

const Checkout = ({ active }: CheckoutProps) => {
  const progress = useSharedValue(0);
  useEffect(() => {
    if (active) {
      progress.value = withDelay(500, withSpring(1));
    }
  }, [active, progress]);
  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      progress.value,
      [0, 0.5, 1],
      [1, 1.2, 1],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scale }],
    };
  });
  const bubble = useAnimatedStyle(() => ({
    position: "absolute",
    top: SIZE / 2,
    right: SIZE / 2,
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    opacity: mix(progress.value, 0, 1),
    transform: [{ scale: mix(progress.value, 0, 1) }],
  }));
  return (
    <View style={styles.container}>
      <Animated.View style={style}>
        <AntDesign size={32} name="shoppingcart" />
      </Animated.View>
      <Animated.View style={bubble}>
        <Text style={styles.bubble}>1</Text>
      </Animated.View>
    </View>
  );
};

export default Checkout;
