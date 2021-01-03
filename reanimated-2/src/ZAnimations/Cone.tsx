import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import Background from "../components/Background";

import ZCone from "./components/ZCone";
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

const Cone = () => {
  return (
    <View style={styles.container}>
      <Background />
      <ZSvg canvas={canvas}>
        <ZCone r={0.35} length={0.9} base="#FFC27A" body="#45A6E5" />
      </ZSvg>
    </View>
  );
};

export default Cone;
