import * as React from "react";
import { View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import {
  Album, MIN_HEADER_HEIGHT, MAX_HEADER_HEIGHT, HEADER_DELTA,
} from "./Model";
import Header from "./Header";
import Content from "./Content";
import Cover from "./Cover";
import ShufflePlay, { BUTTON_HEIGHT } from "./ShufflePlay";

const { Value, cond, greaterOrEq } = Animated;

interface AlbumProps {
  album: Album;
}

export default ({ album }: AlbumProps) => {
  const y = new Value(0);
  const { artist } = album;
  const opacity = cond(greaterOrEq(y, HEADER_DELTA + BUTTON_HEIGHT / 2), 1, 0);
  return (
    <View style={styles.container}>
      <Cover {...{ y, album }} />
      <Content {...{ y, album }} />
      <Header {...{ y, artist }} />
      <Animated.View
        style={{
          position: "absolute",
          top: MIN_HEADER_HEIGHT,
          left: 0,
          right: 0,
          opacity,
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
