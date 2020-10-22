import React from "react";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { Vector, serialize } from "react-native-redash";
import { Path } from "react-native-svg";

import { matrixVecMul4, processTransform3d } from "./Matrix4";
import { Vector3 } from "./Vector";
import { Path3 } from "./Path3";
import DebugPath from "./DebugPath";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface ZPathProps {
  path: Path3;
  camera: Vector<Animated.SharedValue<number>>;
  canvas: Vector3;
  stroke: string;
  strokeWidth: number;
  fill?: boolean;
  debug?: boolean;
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

const ZPath = ({
  path,
  camera,
  canvas,
  stroke,
  strokeWidth,
  fill,
  debug,
}: ZPathProps) => {
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
  return (
    <>
      <AnimatedPath
        animatedProps={animatedProps}
        stroke={stroke}
        fill={fill ? stroke : "transparent"}
        strokeWidth={scaledStrokeWidth}
        strokeLinecap="round"
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

/*

      {path.curves.map((_, i) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const to = useAnimatedProps(() => ({
          cx: path2.value.curves[i].to.x,
          cy: path2.value.curves[i].to.y,
        }));
        return (
          <AnimatedCircle key={i} animatedProps={to} r={10} fill={stroke} />
        );
      })}
      */
export default ZPath;
