import React from "react";
import { Text } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import type { Video } from "../Videos";

import { END } from "./Background";

interface ContentProps {
  height: SharedValue<number>;
  video: Video;
}

export const Content = ({ height, video }: ContentProps) => {
  //const { top } = useSafeAreaInsets();
  //const start = wHeight - top;
  const style = useAnimatedStyle(() => ({
    padding: 16,
    flex: 1,
    backgroundColor: "white",
    opacity: interpolate(height.value, [END, END + 100], [0, 1]),
  }));
  return (
    <Animated.View style={style}>
      <Text style={{ fontSize: 24 }}>{video.title}</Text>
    </Animated.View>
  );
};
