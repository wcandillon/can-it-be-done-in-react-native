import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import ZCylinder from "./components/ZCylinder";
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

const Arc = () => {
  return (
    <View style={styles.container}>
      <ZSvg canvas={canvas}>
        <ZCylinder
          r={-0.5}
          length={1}
          front="#FFC27A"
          back="#7EDAB9"
          body="#45A6E5"
        />
      </ZSvg>
    </View>
  );
};

export default Arc;
