import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import ImageViewer, { CANVAS } from "./ImageViewer";

export const assets = [
  require("./assets/3.jpg"),
  require("./assets/2.jpg"),
  require("./assets/4.jpg"),
  require("./assets/5.jpg"),
  require("./assets/1.jpg"),
];

const { x: width, y: height } = CANVAS;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  pictures: {
    flexDirection: "row",
    height,
    width: width * assets.length,
  },
});

const WhatsApp = () => {
  return (
    <Animated.View style={styles.container}>
      <View style={styles.pictures}>
        {assets.map((source) => (
          <ImageViewer key={source} {...{ source }} />
        ))}
      </View>
    </Animated.View>
  );
};

export default WhatsApp;
