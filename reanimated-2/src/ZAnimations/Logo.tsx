import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import Background from "../components/Background";

import ReactLogo from "./components/ReactLogo";
import ZSvg from "./components/ZSvg";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const canvas = {
  x: width,
  y: width,
  z: width,
};

const Logo = () => {
  return (
    <View style={styles.container}>
      <Background />
      <ZSvg canvas={canvas}>
        <ReactLogo />
      </ZSvg>
    </View>
  );
};

export default Logo;
