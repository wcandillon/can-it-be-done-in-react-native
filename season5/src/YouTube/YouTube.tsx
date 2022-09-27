import React from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { videos } from "./Videos";
import { VideoThumbnail } from "./VideoThumbnail";

export const YouTube = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ height: insets.top }} />
      <ScrollView>
        {videos.map((video) => (
          <VideoThumbnail key={video.id} {...{ video }} />
        ))}
      </ScrollView>
    </View>
  );
};
