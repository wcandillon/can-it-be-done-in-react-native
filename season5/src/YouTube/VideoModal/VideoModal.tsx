import type { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View, Dimensions } from "react-native";
import { Video as VideoPlayer } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { snapPoint, clamp } from "react-native-redash";

import type { Video } from "../Videos";

import { Background, END } from "./Background";
import { Content } from "./Content";

const { width, height: wHeight } = Dimensions.get("window");

export const VideoModal = ({
  route,
}: StackScreenProps<{ Video: { video: Video } }>) => {
  const { top } = useSafeAreaInsets();
  const start = wHeight - top;
  const height = useSharedValue(start);
  const { video } = route.params;
  const gesture = Gesture.Pan()
    .onChange(({ changeY }) => {
      height.value = clamp(height.value - changeY, END, start);
    })
    .onEnd(({ velocityY: velocity }) => {
      const dst = snapPoint(height.value, velocity, [start, END]);
      height.value = withSpring(dst, { velocity, overshootClamping: true });
    });
  const style = useAnimatedStyle(() => ({
    height: height.value,
    backgroundColor: "white",
  }));
  const videoStyle = useAnimatedStyle(() => ({
    width: interpolate(height.value, [END, start], [150, width], "clamp"),
    height: interpolate(
      height.value,
      [start - 100, start],
      [150, width * video.aspectRatio],
      "clamp"
    ),
  }));
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <Background height={height} />
      <GestureDetector gesture={gesture}>
        <Animated.View style={style}>
          <Animated.View style={videoStyle}>
            <VideoPlayer
              source={video.video}
              style={{ flex: 1 }}
              shouldPlay={true}
            />
          </Animated.View>
          <Content height={height} video={video} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};
