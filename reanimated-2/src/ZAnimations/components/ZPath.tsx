import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  Vector,
  serialize,
  avg,
  Transforms3d,
  matrixVecMul4,
  processTransform3d,
  Matrix4,
} from "react-native-redash";
import Svg, { Path } from "react-native-svg";

import { Vector3 } from "./Vector";
import { Path3 } from "./Path3";
import DebugPath from "./DebugPath";
import { useZSvg } from "./ZSvg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface ZPathProps {
  path: Path3;
  stroke: string;
  strokeWidth: number;
  fill?: boolean;
  debug?: boolean;
  transform: Transforms3d;
}

const project = (p: Vector3, canvas: Vector3, m: Matrix4): Vector3 => {
  "worklet";
  const pr = matrixVecMul4(m, [p.x, p.y, p.z, 1]);
  return {
    x: ((pr[0] / pr[3]) * canvas.x) / 2,
    y: ((pr[1] / pr[3]) * canvas.y) / 2,
    z: ((pr[2] / pr[3]) * canvas.z) / 2,
  };
};

const ZPath = ({
  path,
  stroke,
  strokeWidth,
  fill,
  debug,
  transform,
}: ZPathProps) => {
  const { camera, canvas } = useZSvg();
  const path2 = useDerivedValue(
    (): Path3 => {
      const cameraTransform: Transforms3d = [
        { perspective: 5 },
        { rotateY: camera.x.value },
        { rotateX: camera.y.value },
      ];
      const transformMatrix = processTransform3d(
        cameraTransform.concat(transform)
      );
      return {
        move: project(path.move, canvas, transformMatrix),
        curves: path.curves.map((curve) => ({
          c1: project(curve.c1, canvas, transformMatrix),
          c2: project(curve.c2, canvas, transformMatrix),
          to: project(curve.to, canvas, transformMatrix),
        })),
        close: path.close,
      };
    }
  );
  const animatedProps = useAnimatedProps(() => {
    return {
      d: serialize(path2.value),
    };
  });
  const scaledStrokeWidth = strokeWidth * canvas.x;
  const style = useAnimatedStyle(() => ({
    zIndex: avg(
      [path2.value.move.z].concat(
        path2.value.curves.map(({ c1, c2, to }) => avg([c1.z, c2.z, to.z]))
      )
    ),
  }));
  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, style]}
      pointerEvents="none"
    >
      <Svg
        style={StyleSheet.absoluteFill}
        viewBox={[-canvas.x / 2, -canvas.y / 2, canvas.x, canvas.y].join(" ")}
      >
        <AnimatedPath
          animatedProps={animatedProps}
          stroke={stroke}
          fill={fill ? stroke : "transparent"}
          strokeWidth={scaledStrokeWidth}
        />
        {debug &&
          path2.value.curves.map((_, i) => (
            <DebugPath
              key={i}
              stroke={stroke}
              strokeWidth={scaledStrokeWidth}
              path={path2}
              index={i}
            />
          ))}
      </Svg>
    </Animated.View>
  );
};

ZPath.defaultProps = {
  transform: [],
};

export default ZPath;
