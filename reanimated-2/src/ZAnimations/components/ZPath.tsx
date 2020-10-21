import React from "react";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { Vector } from "react-native-redash";
import { Circle, Line } from "react-native-svg";

import { matrixVecMul4, processTransform3d } from "./Matrix4";
import { Vector3 } from "./Vector";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);

interface ZPathProps {
  path: Vector3[];
  camera: Vector<Animated.SharedValue<number>>;
  canvas: Vector3;
  closed?: boolean;
}

const ZPath = ({ path, camera, canvas, closed }: ZPathProps) => {
  const points = useDerivedValue(() => {
    const transform = processTransform3d([
      { rotateY: camera.x.value },
      { rotateX: camera.y.value },
    ]);
    return path.map((p) => {
      const pr = matrixVecMul4(transform, [
        (p.x * canvas.x) / 2,
        (p.y * canvas.y) / 2,
        (p.z * canvas.z) / 2,
        1,
      ]);
      return { x: pr[0] / pr[3], y: pr[1] / pr[3], z: pr[2] / pr[3] };
    });
  });
  const lines = useDerivedValue(() => {
    const l = path.reduce<[Vector3, Vector3][]>((acc, _, index) => {
      const current = points.value[index];
      if (index !== 0) {
        const prev = points.value[index - 1];
        acc.push([prev, current]);
      }
      if (index === path.length - 1) {
        if (closed) {
          // eslint-disable-next-line prefer-destructuring
          const first = points.value[0];
          acc.push([current, first]);
        }
      }
      return acc;
    }, []);
    return l;
  });
  return (
    <>
      {path.map((_, key) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const animatedProps = useAnimatedProps(() => {
          const point = points.value[key];
          return { cx: point.x, cy: point.y };
        });
        return (
          <AnimatedCircle
            animatedProps={animatedProps}
            key={key}
            r={10}
            fill="red"
          />
        );
      })}
      {lines.value.map((_, key) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const animatedProps = useAnimatedProps(() => {
          const line = lines.value[key];
          console.log(
            JSON.stringify(
              { x1: line[0].x, y1: line[0].y, x2: line[1].x, y2: line[1].y },
              null,
              2
            )
          );
          return { x1: line[0].x, y1: line[0].y, x2: line[1].x, y2: line[1].y };
        });
        return (
          <AnimatedLine
            animatedProps={animatedProps}
            key={key}
            strokeWidth={10}
            stroke="red"
          />
        );
      })}
    </>
  );
};

export default ZPath;
