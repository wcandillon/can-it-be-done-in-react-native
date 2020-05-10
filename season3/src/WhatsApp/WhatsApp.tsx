import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  diffClamp,
  translate,
  usePanGestureHandler,
  withOffset,
  withSpring,
} from "react-native-redash";
import ImageViewer from "./ImageViewer";

export const assets = [
  require("./assets/1.jpg"),
  require("./assets/2.jpg"),
  require("./assets/3.jpg"),
  require("./assets/4.jpg"),
  require("./assets/5.jpg"),
];

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  picture: {
    width,
    height,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});

const WhatsApp = () => {
  return (
    <ImageViewer>
      <Animated.View
        style={{
          height,
          width: width * assets.length,
          flexDirection: "row",
          transform: [{ translateX: 0 }],
        }}
      >
        {assets.map((asset) => (
          <View key={asset} style={styles.picture}>
            <Image source={asset} style={styles.image} />
          </View>
        ))}
      </Animated.View>
    </ImageViewer>
  );
};

export default WhatsApp;
