import * as React from "react";
import { View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { Album } from "./Model";
import Content from "./Content";
import Cover from "./Cover";

interface AlbumProps {
  album: Album;
}

const { Value } = Animated;

export default ({ album }: AlbumProps) => {
  const y = new Value(0);
  return (
    <View style={styles.container}>
      <Cover {...{ y, album }} />
      <Content {...{ y, album }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
