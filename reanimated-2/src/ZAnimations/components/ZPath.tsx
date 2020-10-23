import React from "react";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useAnimatedReaction,
} from "react-native-reanimated";
import { Vector, serialize } from "react-native-redash";
import { Path } from "react-native-svg";

import { matrixVecMul4, processTransform3d } from "./Matrix4";
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
  z: Animated.SharedValue<number>;
}

const project = (
  p: Vector3,
  camera: Vector<Animated.SharedValue<number>>,
  canvas: Vector3
): Vector3 => {
  "worklet";
  const m = processTransform3d([
    { perspective: 1000 },
    { rotateY: camera.x.value },
    { rotateX: camera.y.value },
  ]);
  const pr = matrixVecMul4(m, [
    (p.x * canvas.x) / 2,
    (p.y * canvas.y) / 2,
    (p.z * canvas.z) / 2,
    1,
  ]);
  return { x: pr[0] / pr[3], y: pr[1] / pr[3], z: pr[2] / pr[3] };
};

const ZPath = ({ path, stroke, strokeWidth, fill, debug, z }: ZPathProps) => {
  const { camera, canvas } = useZSvg();
  const path2 = useDerivedValue(() => ({
    move: project(path.move, camera, canvas),
    curves: path.curves.map((curve) => ({
      c1: project(curve.c1, camera, canvas),
      c2: project(curve.c2, camera, canvas),
      to: project(curve.to, camera, canvas),
    })),
    close: path.close,
  }));
  const animatedProps = useAnimatedProps(() => {
    return {
      d: serialize(path2.value),
    };
  });
  const scaledStrokeWidth = strokeWidth * canvas.x;
  useAnimatedReaction(
    () => {
      return path2.value.move.z;
    },
    (v: number) => {
      z.value = 1000 + v;
    }
  );
  return (
    <>
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
    </>
  );
};

export default ZPath;
