import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Svg from "react-native-svg";

import Camera from "./components/Camera";
import ZPath from "./components/ZPath";
import { createPath3, addArc3 } from "./components/Path3";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const useCamera = () => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  return { x, y };
};

const canvas = {
  x: width,
  y: width,
  z: width,
};

const strokeWidth = 0.05;
const colors = ["#FFC27A", "#7EDAB9", "#45A6E5", "#FE8777"];
const paths = new Array(colors.length).fill(0).map((_, i) => {
  const o = (i * strokeWidth) / 2;
  const path = createPath3({ x: -0.6, y: -0.6 + o, z: 0 });
  addArc3(path, { x: 0.2, y: -0.6 + o, z: 0 }, { x: 0.2, y: 0.2 + o, z: 0 });
  addArc3(path, { x: 0.2, y: 0.6 + o, z: 0 }, { x: 0.6, y: 0.6 + o, z: 0 });
  return path;
});

const ZAnimations = () => {
  const camera = useCamera();
  return (
    <View style={styles.container}>
      <View>
        <Svg
          width={canvas.x}
          height={canvas.y}
          viewBox={[-canvas.x / 2, -canvas.y / 2, canvas.x, canvas.y].join(" ")}
        >
          {paths.map((path, index) => (
            <ZPath
              key={index}
              stroke={colors[index]}
              strokeWidth={strokeWidth}
              path={path}
              camera={camera}
              canvas={canvas}
              debug
            />
          ))}
        </Svg>
        <Camera camera={camera} canvas={canvas} />
      </View>
    </View>
  );
};

export default ZAnimations;
