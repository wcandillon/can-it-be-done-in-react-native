import React from "react";
import { StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});

const Background = () => {
  return <Image source={require("./assets/bg.png")} style={styles.image} />;
};

export default Background;
