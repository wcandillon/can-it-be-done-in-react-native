import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Svg from "react-native-svg";

import Camera from "./components/Camera";
import ZPath from "./components/ZPath";
import { createPath3, close, addLine } from "./components/Path3";

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

const ZAnimations = () => {
  const camera = useCamera();
  const x = 0.5;
  const y = 0.5;
  const path = createPath3({ x: -x, y: -y, z: 0 });
  addLine(path, { x: x, y: -y, z: 0 });
  addLine(path, { x: x, y: y, z: 0 });
  addLine(path, { x: -x, y: y, z: 0 });
  close(path);
  return (
    <View style={styles.container}>
      <View>
        <Svg
          width={canvas.x}
          height={canvas.y}
          viewBox={[-canvas.x / 2, -canvas.y / 2, canvas.x, canvas.y].join(" ")}
        >
          <ZPath path={path} camera={camera} canvas={canvas} closed />
        </Svg>
        <Camera camera={camera} canvas={canvas} />
      </View>
    </View>
  );
};

export default ZAnimations;
