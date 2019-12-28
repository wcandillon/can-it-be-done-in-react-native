import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import List from "./List";

const { width } = Dimensions.get("window");
const size = width - 32;
const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    backgroundColor: "white",
    borderRadius: 16
  }
});

interface ScreenProps {
  alpha: Animated.Node<number>;
}

export default ({ alpha }: ScreenProps) => {
  return (
    <View style={styles.container}>
      <List
        items={[
          { icon: "play", label: "Now Playing" },
          { icon: "list", label: "Playlists" },
          { icon: "layers", label: "Albums" },
          { icon: "users", label: "Users" },
          { icon: "music", label: "Songs" },
          { icon: "shuffle", label: "Shuffle" },
          { icon: "settings", label: "Settings" }
        ]}
      />
    </View>
  );
};
