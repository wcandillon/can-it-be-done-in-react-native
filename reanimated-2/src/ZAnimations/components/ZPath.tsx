import React from "react";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { Vector, Path as Path2, serialize } from "react-native-redash";
import { Circle, Line, Path } from "react-native-svg";

import { Matrix4, matrixVecMul4, processTransform3d } from "./Matrix4";
import { Vector3 } from "./Vector";
import { Path3 } from "./Path3";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const colors = ["#FFC27A", "#7EDAB9", "#45A6E5", "#FE8777"];

interface ZPathProps {
  path: Path3;
  camera: Vector<Animated.SharedValue<number>>;
  canvas: Vector3;
}

const project = (
  p: Vector3,
  camera: Vector<Animated.SharedValue<number>>,
  canvas: Vector3
): Vector => {
  "worklet";
  const m = processTransform3d([
    { rotateY: camera.x.value },
    { rotateX: camera.y.value },
  ]);
  const pr = matrixVecMul4(m, [
    (p.x * canvas.x) / 2,
    (p.y * canvas.y) / 2,
    (p.z * canvas.z) / 2,
    1,
  ]);
  return { x: pr[0] / pr[3], y: pr[1] / pr[3] };
};

const ZPath = ({ path, camera, canvas }: ZPathProps) => {
  const animatedProps = useAnimatedProps(() => {
    const path2 = {
      move: project(path.move, camera, canvas),
      curves: path.curves.map((curve) => ({
        c1: project(curve.c1, camera, canvas),
        c2: project(curve.c2, camera, canvas),
        to: project(curve.to, camera, canvas),
      })),
      close: path.close,
    };
    return {
      d: serialize(path2),
    };
  });
  return (
    <AnimatedPath
      animatedProps={animatedProps}
      stroke={colors[0]}
      strokeWidth={10}
    />
  );
};

export default ZPath;
