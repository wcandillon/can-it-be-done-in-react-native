import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

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
  const translateX = -width * 3;
  return (
    <Animated.View
      style={{
        height,
        width: width * assets.length,
        flexDirection: "row",
        backgroundColor: "black",
        transform: [{ translateX }],
      }}
    >
      {assets.map((asset) => (
        <View key={asset} style={styles.picture}>
          <Image source={asset} style={styles.image} />
        </View>
      ))}
    </Animated.View>
  );
};

export default WhatsApp;
