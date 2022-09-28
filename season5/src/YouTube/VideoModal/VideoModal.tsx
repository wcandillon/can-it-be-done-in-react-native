import type { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View, Dimensions } from "react-native";
import { Video as VideoPlayer, ResizeMode } from "expo-av";
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
import { PlayerControls } from "./PlayerControls";

const AnimatedVideoPlayer = Animated.createAnimatedComponent(VideoPlayer);
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
  const videoStyle = useAnimatedStyle(() => {
    const videoHeight = interpolate(
      height.value,
      [END, start],
      [100, video.aspectRatio * width],
      "clamp"
    );
    return {
      width: interpolate(height.value, [END, END + 100], [100, width], "clamp"),
      height: videoHeight,
    };
  });
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
          <View style={{ flexDirection: "row" }}>
            <AnimatedVideoPlayer
              resizeMode={ResizeMode.COVER}
              source={video.video}
              style={videoStyle}
              shouldPlay={true}
            />
            <PlayerControls height={height} title={video.title} />
          </View>
          <Content height={height} video={video} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};
