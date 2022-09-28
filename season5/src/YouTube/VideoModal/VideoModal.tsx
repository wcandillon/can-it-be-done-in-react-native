import type { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View, Dimensions, StatusBar } from "react-native";
import { Video as VideoPlayer } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import type { Video } from "../Videos";

import { Background, END } from "./Background";

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
      height.value -= changeY;
    })
    .onEnd(({ velocityY: velocity }) => {
      const dst = snapPoint(height.value, velocity, [start, END]);
      height.value = withSpring(dst, { velocity, overshootClamping: true });
    });
  const style = useAnimatedStyle(() => ({
    height: height.value,
    backgroundColor: "white",
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
          <VideoPlayer
            source={video.video}
            style={{ width, height: width * video.aspectRatio }}
            shouldPlay={true}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};
