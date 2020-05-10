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
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  picture: {
    width,
    height,
  },
});

const WhatsApp = () => {
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const translateX = withSpring({
    value: translation.x,
    velocity: velocity.x,
    snapPoints: assets.map((_, i) => -i * width),
    state,
  });
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={styles.container}>
        <Animated.View
          style={{
            height,
            width: width * assets.length,
            flexDirection: "row",
            transform: [{ translateX }],
          }}
        >
          {assets.map((asset) => (
            <View key={asset} style={styles.picture}>
              <ImageViewer source={asset} />
            </View>
          ))}
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default WhatsApp;
