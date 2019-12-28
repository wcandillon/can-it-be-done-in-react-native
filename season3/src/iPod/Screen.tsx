import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { interpolate } from "react-native-reanimated";

import List from "./List";
import StatusBar from "./StatusBar";

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
  const y = interpolate(alpha, {
    inputRange: [0, 2 * Math.PI],
    outputRange: [0, size]
  });
  return (
    <View style={styles.container}>
      <StatusBar />
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
        {...{ y }}
      />
    </View>
  );
};
