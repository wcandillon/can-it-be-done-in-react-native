import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { mix, useLoop, useValues } from "react-native-redash";

import { debug, divide, multiply, sub, useCode } from "react-native-reanimated";
import Face from "./Face";
import Gesture from "./Gesture";
import { DISTANCE, SIZE, vec3 } from "./ThreeDMath";
import { Matrix4, matrixVecMul4, processTransform3d } from "./Matrix4";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const backface = [
  { x: 0, y: 0, z: -SIZE / 2 },
  { x: SIZE, y: 0, z: -SIZE / 2 },
  { x: 0, y: SIZE, z: -SIZE / 2 },
  { x: SIZE, y: SIZE, z: -SIZE / 2 },
] as const;

const frontface = [
  { x: 0, y: 0, z: SIZE / 2 },
  { x: SIZE, y: 0, z: SIZE / 2 },
  { x: 0, y: SIZE, z: SIZE / 2 },
  { x: SIZE, y: SIZE, z: SIZE / 2 },
] as const;

const points = [...frontface, ...backface];

// https://webglfundamentals.org/webgl/lessons/webgl-3d-perspective.html
const project = (m: Matrix4, p: ReturnType<typeof vec3>) => {
  const [x, y, z, w] = matrixVecMul4(m, [p.x, p.y, p.z, 1]);
  return { x: multiply(x, w), y: multiply(y, w), z: multiply(z, w) };
};

const ThreeD = () => {
  const [rotateX, rotateY] = useValues([0, 0]);

  const m = processTransform3d([
    { translateX: SIZE / 2 },
    { translateY: SIZE / 2 },
    { rotateY },
    { rotateX },
    { translateX: -SIZE / 2 },
    { translateY: -SIZE / 2 },
  ]);

  const p1 = project(m, points[0]);
  const p2 = project(m, points[1]);
  const p3 = project(m, points[2]);
  const p4 = project(m, points[3]);

  const p5 = project(m, points[4]);
  const p6 = project(m, points[5]);
  const p7 = project(m, points[6]);
  const p8 = project(m, points[7]);

  return (
    <View style={styles.container}>
      <Face label="Back" backgroundColor="#495DFF" points={[p5, p6, p7, p8]} />
      <Face label="Front" backgroundColor="#FFFF72" points={[p1, p2, p3, p4]} />
      <Face label="Top" backgroundColor="#7BFF70" points={[p1, p2, p5, p6]} />
      <Face
        label="Bottom"
        backgroundColor="#FF665E"
        points={[p3, p4, p7, p8]}
      />
      <Face label="Left" backgroundColor="#FF6AFF" points={[p1, p3, p5, p7]} />
      <Face label="Right" backgroundColor="#7CFFFF" points={[p2, p4, p6, p8]} />
      <Gesture {...{ rotateX, rotateY }} />
    </View>
  );
};

export default ThreeD;
