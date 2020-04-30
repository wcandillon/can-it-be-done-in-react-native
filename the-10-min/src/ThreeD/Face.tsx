import React from "react";
import { StyleSheet } from "react-native";
import Animated, { multiply } from "react-native-reanimated";
import { atan2, vec } from "react-native-redash";
import { processTransform } from "./Matrix4";
import { Point, matrixVecMul, scaleToCanvas, solve } from "./ThreeDMath";

interface FaceProps {
  points: [Point, Point, Point, Point];
  theta: Animated.Node<number>;
}

const Face = ({ points, theta }: FaceProps) => {
  const m = processTransform([
    { rotateY: theta },
    { rotateX: theta },
    { rotateZ: theta },
  ]);

  const p1V = matrixVecMul(m, [points[0].x, points[0].y, points[0].z, 1]);
  const p1 = scaleToCanvas(vec.create(p1V[0], p1V[1]));

  const p2V = matrixVecMul(m, [points[1].x, points[1].y, points[1].z, 1]);
  const p2 = scaleToCanvas(vec.create(p2V[0], p2V[1]));

  const p3V = matrixVecMul(m, [points[2].x, points[2].y, points[2].z, 1]);
  const p3 = scaleToCanvas(vec.create(p3V[0], p3V[1]));

  const p4V = matrixVecMul(m, [points[3].x, points[3].y, points[3].z, 1]);
  const p4 = scaleToCanvas(vec.create(p4V[0], p4V[1]));
  const H = solve(points[0], points[1], points[2], points[3], p1, p2, p3, p4);
  // https://math.stackexchange.com/questions/296794/finding-the-transform-matrix-from-4-projected-points-with-javascript
  // https://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/
  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        width: 1,
        height: 1,
        backgroundColor: "cyan",
        transform: [
          { translateX: p1.x },
          { translateY: p1.y },
          { scaleY: b },
          { scaleX: h },
          { skewX: a },
        ],
      }}
    />
  );
};

export default Face;
