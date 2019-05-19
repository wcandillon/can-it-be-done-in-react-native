import * as React from "react";
import { View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { Album } from "./Model";
import Content from "./Content";

const { Value } = Animated;

interface AlbumProps {
  album: Album;
}

export default ({ album }: AlbumProps) => {
  const y = new Value(0);
  return (
    <View style={styles.container}>
      <Content {...{ y, album }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
