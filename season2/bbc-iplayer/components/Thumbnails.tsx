import * as React from "react";
import { View, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import Animated from "react-native-reanimated";

import { Channel } from "./Model";
import Thumbnail from "./Thumbnail";

const { interpolate, useCode, debug } = Animated;
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 0.8
  },
  content: {
    flex: 1
  }
});

interface ThumbnailsProps {
  channels: Channel[];
  index: Animated.Value<number>;
}

export default ({ channels, index }: ThumbnailsProps) => {
  const last = channels.length;
  useCode(debug("index", index), []);
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.content}>
        {channels.map((channel, key) => {
          const translateX = interpolate(
            index,
            key === 0
              ? {
                  inputRange: [0, 1, 1, last - 1, last],
                  outputRange: [0, -width, width, width, 0]
                }
              : {
                  inputRange: [key - 1, key, key + 1],
                  outputRange: [width, 0, -width]
                }
          );
          return (
            <Animated.View
              style={{
                ...StyleSheet.absoluteFillObject,
                transform: [{ translateX }]
              }}
              {...{ key }}
            >
              <Thumbnail name={`${key + 1}`} />
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};
