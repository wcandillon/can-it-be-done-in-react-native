import React from "react";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface ColorProps {
  color: {
    start: string;
    end: string;
  };
  index: number;
  translateX: Animated.SharedValue<number>;
}

const { width } = Dimensions.get("window");
export const COLOR_WIDTH = width / 3;
const RADIUS = 45;

const Color = ({ color, index, translateX }: ColorProps) => {
  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [
        -1 * COLOR_WIDTH * (index + 1),
        -1 * COLOR_WIDTH * index,
        -1 * COLOR_WIDTH * (index - 1),
      ],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );
    const translateY = 0;
    return {
      transform: [{ translateX: translateX.value }, { translateY }, { scale }],
    };
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
  );
};

export default Color;
