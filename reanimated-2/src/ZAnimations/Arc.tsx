import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import ZPath from "./components/ZPath";
import { createPath3, addArc3 } from "./components/Path3";
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

const strokeWidth = 0.05;
const colors = ["#FFC27A", "#7EDAB9", "#45A6E5", "#FE8777"];
const paths = new Array(colors.length).fill(0).map((_, i) => {
  const o = i * (strokeWidth + strokeWidth / 2);
  const path = createPath3({ x: -0.6, y: -0.6 + o, z: 0 });
  addArc3(path, { x: 0.2, y: -0.6 + o, z: 0 }, { x: 0.2, y: 0.2 + o, z: 0 });
  addArc3(path, { x: 0.2, y: 0.6 + o, z: 0 }, { x: 0.6, y: 0.6 + o, z: 0 });
  return path;
});
const Arc = () => {
  return (
    <View style={styles.container}>
      <ZSvg canvas={canvas}>
        {paths.map((path, index) => (
          <ZPath
            key={index}
            stroke={colors[index]}
            strokeWidth={strokeWidth}
            path={path}
          />
        ))}
      </ZSvg>
    </View>
  );
};

export default Arc;
