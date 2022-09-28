import type { StackScreenProps } from "@react-navigation/stack";
import { useCardAnimation } from "@react-navigation/stack";
import React from "react";
import { View, Dimensions, StatusBar } from "react-native";
import { Video as VideoPlayer } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { Video as VideoModel } from "./Videos";

const { width } = Dimensions.get("window");

export const Video = ({
  route,
}: StackScreenProps<{ Video: { video: VideoModel } }>) => {
  const { video } = route.params;
  const { top } = useSafeAreaInsets();
  const { current } = useCardAnimation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "flex-start",
      }}
    >
      <StatusBar barStyle="light-content" />
      <View style={{ backgroundColor: "black", height: top }} />
      <VideoPlayer
        source={video.video}
        style={{ width, height: width * video.aspectRatio }}
        shouldPlay={true}
      />
    </View>
  );
};
