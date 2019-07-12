import * as React from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";

import { Channel } from "./Model";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width,
    aspectRatio: 640 / 360
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined
  },
  content: {
    padding: 16
  },
  type: {
    color: "white",
    fontWeight: "bold"
  },
  title: {
    color: "white",
    fontSize: 24
  },
  subtitle: {
    color: "white",
    fontSize: 18
  }
});

interface ThumbnailProps {
  channel: Channel;
}

export default ({
  channel: { cover, type, title, subtitle }
}: ThumbnailProps) => {
  return (
    <>
      <View style={styles.container}>
        <Image source={cover} style={styles.cover} />
      </View>
      <View style={styles.content}>
        <Text style={styles.type}>{type}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </>
  );
};
