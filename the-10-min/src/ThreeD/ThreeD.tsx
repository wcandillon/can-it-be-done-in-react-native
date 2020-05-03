import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { mix, useLoop, useValues } from "react-native-redash";

import { debug, divide, multiply, useCode } from "react-native-reanimated";
import Face from "./Face";
import Gesture from "./Gesture";
import { SIZE, vec3 } from "./ThreeDMath";
import { Matrix4, matrixVecMul4, processTransform3d } from "./Matrix4";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const backface = [
  { x: -0.5, y: -0.5, z: -0.5 },
  { x: 0.5, y: -0.5, z: -0.5 },
  { x: -0.5, y: 0.5, z: -0.5 },
  { x: 0.5, y: 0.5, z: -0.5 },
] as const;

const frontface = [
  { x: -0.5, y: -0.5, z: 0.5 },
  { x: 0.5, y: -0.5, z: 0.5 },
  { x: -0.5, y: 0.5, z: 0.5 },
  { x: 0.5, y: 0.5, z: 0.5 },
] as const;

const points = [...frontface, ...backface].map((o) => ({
  x: multiply(o.x, SIZE),
  y: multiply(o.y, SIZE),
  z: multiply(o.z, SIZE),
}));

// https://webglfundamentals.org/webgl/lessons/webgl-3d-perspective.html
const point = (m: Matrix4, p: ReturnType<typeof vec3>) => {
  const [x, y, z, w] = matrixVecMul4(m, [p.x, p.y, p.z, 1]);
  return { x: divide(x, 1), y: divide(y, 1), z: divide(z, 1) };
};

const ThreeD = () => {
  const [rotateX, rotateY] = useValues([0, 0]);

  const m = processTransform3d([
    { perspective: 600 },
    { rotateY },
    { rotateX },
  ]);

  const p1 = point(m, points[0]);
  const p2 = point(m, points[1]);
  const p3 = point(m, points[2]);
  const p4 = point(m, points[3]);

  const p5 = point(m, points[4]);
  const p6 = point(m, points[5]);
  const p7 = point(m, points[6]);
  const p8 = point(m, points[7]);

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
