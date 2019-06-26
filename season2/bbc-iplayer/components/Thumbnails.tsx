import * as React from "react";
import { View, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import Animated from "react-native-reanimated";

import { Channel } from "./Model";
import Thumbnail from "./Thumbnail";
import PanGesture from "./PanGesture";

const {
  interpolate,
  Value,
  useCode,
  onChange,
  set,
  sub,
  modulo,
  divide,
  add
} = Animated;
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
  const translateX = new Value(0);
  useCode(
    onChange(
      translateX,
      set(
        index,
        sub(channels.length, modulo(divide(translateX, width), channels.length))
      )
    ),
    []
  );
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.content}>
        {channels.map((channel, key) => {
          const x = interpolate(
            index,
            key === 0
              ? {
                  inputRange: [0, 1, 1, channels.length - 1, channels.length],
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
                transform: [{ translateX: x }]
              }}
              {...{ key }}
            >
              <Thumbnail name={`${key + 1}`} />
            </Animated.View>
          );
        })}
        <PanGesture {...{ translateX }} />
      </View>
    </View>
  );
};
