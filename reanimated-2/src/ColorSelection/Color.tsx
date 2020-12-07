import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler";

interface ColorProps {
  color: {
    start: string;
    end: string;
  };
  index: number;
  translateX: Animated.SharedValue<number>;
  onPress: (pos: { x: number; y: number }) => void;
}

const { width } = Dimensions.get("window");
export const COLOR_WIDTH = width / 3;
const RADIUS = 45;

const Color = ({ color, index, translateX, onPress }: ColorProps) => {
  const inputRange = [
    -1 * COLOR_WIDTH * (index + 1),
    -1 * COLOR_WIDTH * index,
    -1 * COLOR_WIDTH * (index - 1),
  ];
  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0.8, 1, 0.8],
      Extrapolate.CLAMP
    );
    const translateY =
      RADIUS *
      Math.cos(
        interpolate(
          translateX.value,
          inputRange,
          [0, Math.PI / 2, Math.PI],
          Extrapolate.CLAMP
        )
      );
    return {
      transform: [{ translateX: translateX.value }, { translateY }, { scale }],
    };
  });
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ absoluteX: x, absoluteY: y }) => {
      onPress({ x, y });
    },
  });
  return (
    <Animated.View
      style={[
        {
          width: COLOR_WIDTH,
          flexDirection: "row",
          justifyContent: "center",
        },
        style,
      ]}
    >
      <TapGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <LinearGradient
            colors={[color.start, color.end]}
            style={{
              borderColor: "white",
              borderWidth: 6,
              borderRadius: RADIUS,
              width: RADIUS * 2,
              height: RADIUS * 2,
            }}
          />
        </Animated.View>
      </TapGestureHandler>
    </Animated.View>
  );
};

export default Color;
