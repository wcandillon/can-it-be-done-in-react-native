import React from "react";
import { Text, StyleSheet, ScrollView, View, Image } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import type { Video } from "../Videos";
import { videos } from "../Videos";

import { END } from "./Background";
import { Icon } from "./Icon";

interface ContentProps {
  height: SharedValue<number>;
  video: Video;
}

export const Content = ({ height, video }: ContentProps) => {
  //const { top } = useSafeAreaInsets();
  //const start = wHeight - top;
  const style = useAnimatedStyle(() => ({
    flex: 1,
    backgroundColor: "white",
    opacity: interpolate(height.value, [END, END + 100], [0, 1]),
  }));
  return (
    <Animated.View style={style}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>{video.title}</Text>
          <Text style={styles.views}>{`${video.views} views`}</Text>
          <View style={styles.icons}>
            <Icon name="thumbs-up" label="10" />
            <Icon name="thumbs-down" label="0" />
            <Icon name="share" label="Share" />
            <Icon name="arrow-down-circle" label="Download" />
            <Icon name="list" label="Save" />
          </View>
        </View>
        <View style={styles.upNext}>
          <Text style={styles.upNextTitle}>Up next</Text>
          {videos.map((v) => (
            <View key={v.id} style={styles.thumbnail}>
              <Image source={v.thumbnail} style={styles.thumbnailImage} />
              <View style={styles.thumbnailContent}>
                <Text numberOfLines={2} style={styles.thumbnailTitle}>
                  {v.title}
                </Text>
                <Text style={styles.thumbnailUsername}>{v.username}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
  },
  views: {
    color: "gray",
    marginBottom: 16,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  upNext: {
    borderTopWidth: 1,
    borderColor: "lightgray",
    paddingTop: 8,
    padding: 16,
  },
  upNextTitle: {
    fontWeight: "bold",
    color: "gray",
  },
  thumbnail: {
    flexDirection: "row",
    marginTop: 16,
  },
  thumbnailImage: {
    height: 100,
    width: 100,
  },
  thumbnailContent: {
    paddingTop: 8,
    paddingLeft: 8,
    paddingBottom: 8,
    flex: 1,
    flexWrap: "wrap",
  },
  thumbnailTitle: {
    fontSize: 16,
  },
  thumbnailUsername: {
    color: "gray",
  },
});
