import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import Background from "../components/Background";

import ZBox from "./components/ZBox";
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

const Cube = () => {
  return (
    <View style={styles.container}>
      <Background />
      <ZSvg canvas={canvas}>
        <ZBox
          width={1.3}
          height={0.5}
          depth={0.5}
          front={"#FFC27A"}
          back={"#7EDAB9"}
          left={"#45A6E5"}
          right={"#FE8777"}
          top={"#B97EDA"}
          bottom={"#77EEFE"}
        />
      </ZSvg>
    </View>
  );
};

export default Cube;
