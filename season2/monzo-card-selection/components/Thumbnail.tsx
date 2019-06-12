import * as React from "react";
import { Image, View, StyleSheet } from "react-native";

interface ThumbnailProps {
  thumbnail: number;
}

const THUMBNAIL_SIZE = 45;

export default ({ thumbnail }: ThumbnailProps) => {
  return (
    <View style={styles.container}>
      <Image source={thumbnail} style={styles.thumbnail} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8
  },
  thumbnail: {
    height: THUMBNAIL_SIZE,
    width: THUMBNAIL_SIZE,
    resizeMode: "contain",
    borderRadius: 4
  }
});
