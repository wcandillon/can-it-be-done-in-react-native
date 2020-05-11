import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { vec } from "react-native-redash";

const { width, height } = Dimensions.get("window");
export const CANVAS = vec.create(width, height);
const styles = StyleSheet.create({
  container: {
    width: CANVAS.x,
    height: CANVAS.y,
    overflow: "hidden",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});

interface ImageViewProps {
  source: number;
}

const ImageViewer = ({ source }: ImageViewProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} {...{ source }} />
    </View>
  );
};

export default ImageViewer;
