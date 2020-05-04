import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { mix, translate, useLoop, useValues, vec } from "react-native-redash";

import Animated, {
  add,
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
  { x: 0, y: 0, z: -SIZE / 2 },
  { x: SIZE, y: 0, z: -SIZE / 2 },
  { x: SIZE, y: SIZE, z: -SIZE / 2 },
  { x: 0, y: SIZE, z: -SIZE / 2 },
] as const;

const frontface = [
  { x: 0, y: 0, z: SIZE / 2 },
  { x: SIZE, y: 0, z: SIZE / 2 },
  { x: SIZE, y: SIZE, z: SIZE / 2 },
  { x: 0, y: SIZE, z: SIZE / 2 },
] as const;

const points = [...frontface, ...backface];

// https://webglfundamentals.org/webgl/lessons/webgl-3d-perspective.html
const project = (m: Matrix4, p: ReturnType<typeof vec3>) => {
  const [x, y, z, w] = matrixVecMul4(m, [p.x, p.y, p.z, 1]);
  const w1 = divide(DISTANCE, sub(DISTANCE, multiply(-1, z)));
  return {
    x: add(divide(x, w1), width / 4),
    y: add(divide(y, w1), height / 4),
    z: divide(z, w),
  };
};

const ThreeD = () => {
  const [rotateX, rotateY] = useValues([0, 0]);

  const center = vec.create(SIZE / 2);
  const m = processTransform3d([
    ...translate(center),
    { rotateY },
    { rotateX },
    ...translate(vec.multiply(-1, center)),
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
        <AnimatedCircle r={5} fill="blue" cx={p1.x} cy={p1.y} />
        <AnimatedCircle r={5} fill="blue" cx={p2.x} cy={p2.y} />
        <AnimatedCircle r={5} fill="blue" cx={p3.x} cy={p3.y} />
        <AnimatedCircle r={5} fill="blue" cx={p4.x} cy={p4.y} />
        <AnimatedCircle r={5} fill="blue" cx={p5.x} cy={p5.y} />
        <AnimatedCircle r={5} fill="blue" cx={p6.x} cy={p6.y} />
        <AnimatedCircle r={5} fill="blue" cx={p7.x} cy={p7.y} />
        <AnimatedCircle r={5} fill="blue" cx={p8.x} cy={p8.y} />
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
      </Svg>
      <Gesture {...{ rotateX, rotateY }} />
    </View>
  );
};

export default ThreeD;
/*

<Face label="Back" backgroundColor="#2ed573" points={[p5, p6, p7, p8]} />
      <Face label="Front" backgroundColor="#ff9ff3" points={[p1, p2, p3, p4]} />
      <Point point={p1} />
      <Point point={p2} />
      <Point point={p3} />
      <Point point={p4} />
      <Point point={p5} />
      <Point point={p6} />
      <Point point={p7} />
      <Point point={p8} />
      <Face label="Top" backgroundColor="#1e90ff" points={[p1, p2, p5, p6]} />
      <Face
        label="Bottom"
        backgroundColor="#e74c3c"
        points={[p3, p4, p7, p8]}
      />
      <Face label="Left" backgroundColor="#00d2d3" points={[p1, p3, p5, p7]} />
      <Face label="Right" backgroundColor="#f1c40f" points={[p2, p4, p6, p8]} />
      */
