import React from "react";
import { ScrollView, StatusBar, View } from "react-native";

import { videos } from "./Videos";
import { VideoThumbnail } from "./VideoThumbnail";

export const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        {videos.map((video) => (
          <VideoThumbnail key={video.id} {...{ video }} />
        ))}
      </ScrollView>
    </View>
  );
};
