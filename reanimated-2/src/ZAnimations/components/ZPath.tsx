import React from "react";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useAnimatedReaction,
} from "react-native-reanimated";
import {
  Vector,
  serialize,
  avg,
  Transforms3d,
  matrixVecMul4,
  processTransform3d,
} from "react-native-redash";
import { Path } from "react-native-svg";

import { Vector3 } from "./Vector";
import { Path3 } from "./Path3";
import DebugPath from "./DebugPath";
import { useZIndex, useZSvg } from "./ZSvg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface ZPathProps {
  path: Path3;
  stroke: string;
  strokeWidth: number;
  fill?: boolean;
  debug?: boolean;
  transform: Transforms3d;
}

const project = (
  p: Vector3,
  camera: Vector<Animated.SharedValue<number>>,
  canvas: Vector3,
  transform: Transforms3d
): Vector3 => {
  "worklet";
  const cameraTransform: Transforms3d = [
    { rotateY: camera.x.value },
    { rotateX: camera.y.value },
  ];
  const m = processTransform3d(cameraTransform.concat(transform));
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
  const zIndex = useZIndex();
  const path2 = useDerivedValue(() => ({
    move: project(path.move, camera, canvas, transform),
    curves: path.curves.map((curve) => ({
      c1: project(curve.c1, camera, canvas, transform),
      c2: project(curve.c2, camera, canvas, transform),
      to: project(curve.to, camera, canvas, transform),
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
      return avg(
        [path2.value.move.z].concat(
          path2.value.curves.map(({ c1, c2, to }) => avg([c1.z, c2.z, to.z]))
        )
      );
    },
    (v: number) => {
      zIndex.value = 1000 + v;
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

ZPath.defaultProps = {
  transform: [],
};

export default ZPath;
