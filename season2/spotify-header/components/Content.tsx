import * as React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { onScroll } from "react-native-redash";

import { Album } from "./Model";
import Track from "./Track";

interface ContentProps {
  album: Album;
  y: Animated.Value<number>;
}

export default ({ album: { artist, tracks }, y }: ContentProps) => {
  const foo = 1;
  return (
    <Animated.ScrollView
      onScroll={onScroll({ y })}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
    >
      {
        tracks.map((track, index) => (
          <Track
            key={index}
            {...{track, index, artist}}
          />
        ))
      }
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
