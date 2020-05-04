import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  mix,
  string,
  translate,
  useLoop,
  useValues,
  vec,
} from "react-native-redash";

import Animated, {
  add,
  concat,
  debug,
  divide,
  multiply,
  sub,
  useCode,
} from "react-native-reanimated";
import Svg, { Circle, Line, Polygon } from "react-native-svg";
import Face from "./Face";
import Gesture from "./Gesture";
import { DISTANCE, SIZE, vec3 } from "./ThreeDMath";
import { Matrix4, matrixVecMul4, processTransform3d } from "./Matrix4";

import Point from "./Point";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const backface = [
  { x: -SIZE / 2, y: -SIZE / 2, z: -SIZE / 2 },
  { x: SIZE / 2, y: -SIZE / 2, z: -SIZE / 2 },
  { x: SIZE / 2, y: SIZE / 2, z: -SIZE / 2 },
  { x: -SIZE / 2, y: SIZE / 2, z: -SIZE / 2 },
] as const;

const frontface = [
  { x: -SIZE / 2, y: -SIZE / 2, z: SIZE / 2 },
  { x: SIZE / 2, y: -SIZE / 2, z: SIZE / 2 },
  { x: SIZE / 2, y: SIZE / 2, z: SIZE / 2 },
  { x: -SIZE / 2, y: SIZE / 2, z: SIZE / 2 },
] as const;

const points = [...frontface, ...backface];

// https://webglfundamentals.org/webgl/lessons/webgl-3d-perspective.html
const project = (m: Matrix4, p: ReturnType<typeof vec3>) => {
  const [x, y, z, w] = matrixVecMul4(m, [p.x, p.y, p.z, 1]);
  // const w1 = divide(DISTANCE, sub(DISTANCE, multiply(-1, z)));
  return {
    x: add(divide(x, w), width / 2),
    y: add(divide(y, w), width / 2),
    z: divide(z, w),
  };
};

const ThreeD = () => {
  const [rotateX, rotateY] = useValues([0, 0]);

  const center = vec.create(SIZE / 2);
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

  const prj = [p1, p2, p3, p4, p5, p6, p7, p8];
  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        {prj.map((p, i) => (
          <AnimatedCircle key={i} r={5} fill="blue" cx={p.x} cy={p.y} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <React.Fragment key={i}>
            <AnimatedLine
              stroke="blue"
              strokeWidth={1}
              x1={prj[i].x}
              y1={prj[i].y}
              x2={prj[(i + 1) % 4].x}
              y2={prj[(i + 1) % 4].y}
            />
            <AnimatedLine
              stroke="blue"
              strokeWidth={1}
              x1={prj[i + 4].x}
              y1={prj[i + 4].y}
              x2={prj[((i + 1) % 4) + 4].x}
              y2={prj[((i + 1) % 4) + 4].y}
            />
            <AnimatedLine
              stroke="blue"
              strokeWidth={1}
              x1={prj[i].x}
              y1={prj[i].y}
              x2={prj[i + 4].x}
              y2={prj[i + 4].y}
            />
          </React.Fragment>
        ))}

        <AnimatedPolygon
          fill="rgba(100, 200, 300, 0.61)"
          points={string`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`}
        />
        <AnimatedPolygon
          fill="rgba(200, 100, 400, 0.61)"
          points={string`${p5.x},${p5.y} ${p6.x},${p6.y} ${p7.x},${p7.y} ${p8.x},${p8.y}`}
        />
        <AnimatedPolygon
          fill="rgba(400, 200, 0, 0.61)"
          points={string` ${p5.x},${p5.y} ${p1.x},${p1.y} ${p2.x},${p2.y} ${p6.x},${p6.y}`}
        />
        <AnimatedPolygon
          fill="rgba(100, 200, 100, 0.61)"
          points={string` ${p7.x},${p7.y} ${p3.x},${p3.y} ${p4.x},${p4.y} ${p8.x},${p8.y}`}
        />
      </Svg>
      <Gesture {...{ rotateX, rotateY }} />
    </View>
  );
};

export default ThreeD;
/*
 */
