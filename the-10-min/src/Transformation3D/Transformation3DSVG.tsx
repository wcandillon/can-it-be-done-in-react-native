import React from "react";
import { Dimensions } from "react-native";

import {
  Vector,
  matrixVecMul4,
  processTransform3d,
  string,
  useValues,
} from "react-native-redash";
import Svg, { Circle, Polygon } from "react-native-svg";
import Animated, { divide } from "react-native-reanimated";
import { SIZE } from "./Constants";
import Gesture from "./Gesture";

const { width, height } = Dimensions.get("window");
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

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

const points3D = [...frontface, ...backface];

const serialize = (p1: Vector, p2: Vector, p3: Vector, p4: Vector) =>
  string`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`;

const Transformations3D = () => {
  const [rotateX, rotateY] = useValues([0, 0]);
  const transform = processTransform3d([{ rotateY }, { rotateX }]);
  const points = points3D.map((p) => {
    const [x, y, z, w] = matrixVecMul4(transform, [
      p.x * SIZE,
      p.y * SIZE,
      p.z * SIZE,
      1,
    ]);
    return { x: divide(x, w), y: divide(y, w), z: divide(z, w) };
  });
  const [p1, p2, p3, p4, p5, p6, p7, p8] = points;
  return (
    <>
      <Svg width={width} height={height}>
        {points.map(({ x, y }, index) => (
          <AnimatedCircle key={index} r={5} fill="blue" cx={x} cy={y} />
        ))}
        <AnimatedPolygon
          opacity={0.5}
          fill="#1abc9c"
          points={serialize(p1, p2, p4, p3)}
        />
        <AnimatedPolygon
          opacity={0.5}
          fill="#3498db"
          points={serialize(p5, p6, p8, p7)}
        />
        <AnimatedPolygon
          opacity={0.5}
          fill="#2ecc71"
          points={serialize(p1, p2, p6, p5)}
        />
        <AnimatedPolygon
          opacity={0.5}
          fill="#e74c3c"
          points={serialize(p3, p4, p8, p7)}
        />
      </Svg>
      <Gesture {...{ rotateX, rotateY }} />
    </>
  );
};

export default Transformations3D;
