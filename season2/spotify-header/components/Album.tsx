import * as React from "react";
import { View, StyleSheet, Platform } from "react-native";
import Animated from "react-native-reanimated";
import {
  Album, MIN_HEADER_HEIGHT, HEADER_DELTA, MAX_HEADER_HEIGHT,
} from "./Model";
import Header from "./Header";
import Content from "./Content";
import Cover from "./Cover";
import ShufflePlay, { BUTTON_HEIGHT } from "./ShufflePlay";

interface AlbumProps {
  album: Album;
}

const {
  Value, greaterOrEq, cond, multiply, min,
} = Animated;

export default ({ album }: AlbumProps) => {
  const { artist } = album;
  const y = new Value(0);
  // Because of the bug below, we need to use a different strategy on iOS
  // https://github.com/facebook/react-native/issues/24826
  const opacity = Platform.OS === "ios" ? cond(greaterOrEq(y, HEADER_DELTA + BUTTON_HEIGHT / 2), 1, 0) : 1;
  const translateY = Platform.OS === "ios" ? 0 : multiply(min(y, HEADER_DELTA), -1);
  return (
    <View style={styles.container}>
      <Cover {...{ y, album }} />
      <Content btnOpacity={opacity} {...{ y, album }} />
      <Header {...{ y, artist }} />
      <Animated.View
        style={{
          position: "absolute",
          top: Platform.OS === "ios" ? MIN_HEADER_HEIGHT : MAX_HEADER_HEIGHT - BUTTON_HEIGHT / 2,
          left: 0,
          right: 0,
          opacity,
          transform: [{ translateY }],
        }}
      >
        <ShufflePlay />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
