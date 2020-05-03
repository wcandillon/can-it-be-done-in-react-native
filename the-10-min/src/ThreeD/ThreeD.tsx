import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { mix, useLoop, useValues } from "react-native-redash";

import { debug, divide, multiply, sub, useCode } from "react-native-reanimated";
import Face from "./Face";
import Gesture from "./Gesture";
import { DISTANCE, SIZE, vec3 } from "./ThreeDMath";
import { Matrix4, matrixVecMul4, processTransform3d } from "./Matrix4";

import Point from "./Point";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const backface = [
  { x: -SIZE / 2, y: -SIZE / 2, z: -SIZE / 2 },
  { x: SIZE / 2, y: -SIZE / 2, z: -SIZE / 2 },
  { x: -SIZE / 2, y: SIZE / 2, z: -SIZE / 2 },
  { x: SIZE / 2, y: SIZE / 2, z: -SIZE / 2 },
] as const;

const frontface = [
  { x: -SIZE / 2, y: -SIZE / 2, z: SIZE / 2 },
  { x: SIZE / 2, y: -SIZE / 2, z: SIZE / 2 },
  { x: -SIZE / 2, y: SIZE / 2, z: SIZE / 2 },
  { x: SIZE / 2, y: SIZE / 2, z: SIZE / 2 },
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
    { perspective: 600 },
    { rotateY },
    { rotateX },
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
      <Face label="Back" backgroundColor="#2ed573" points={[p5, p6, p7, p8]} />
      <Face label="Front" backgroundColor="#ff9ff3" points={[p1, p2, p3, p4]} />
      <Face label="Top" backgroundColor="#1e90ff" points={[p1, p2, p5, p6]} />
      <Face
        label="Bottom"
        backgroundColor="#e74c3c"
        points={[p3, p4, p7, p8]}
      />
      <Face label="Left" backgroundColor="#00d2d3" points={[p1, p3, p5, p7]} />
      <Face label="Right" backgroundColor="#f1c40f" points={[p2, p4, p6, p8]} />
      <Point point={p1} />
      <Point point={p2} />
      <Point point={p3} />
      <Point point={p4} />
      <Point point={p5} />
      <Point point={p6} />
      <Point point={p7} />
      <Point point={p8} />
      <Gesture {...{ rotateX, rotateY }} />
    </View>
  );
};

export default ThreeD;
