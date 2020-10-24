import React from "react";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  serialize,
  avg,
  Transforms3d,
  processTransform3d,
} from "react-native-redash";
import { Path } from "react-native-svg";

import { project } from "./Vector";
import { Path3 } from "./Path3";
import { useZSvg } from "./ZSvg";
import Layer from "./Layer";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface ZPathProps {
  path: Path3;
  stroke: string;
  strokeWidth: number;
  fill?: boolean;
  debug?: boolean;
  transform: Transforms3d;
}

const ZPath = ({ path, stroke, strokeWidth, fill, transform }: ZPathProps) => {
  const { camera, canvas } = useZSvg();
  const path2 = useDerivedValue(
    (): Path3 => {
      const cameraTransform: Transforms3d = [
        //   { perspective: 5 },
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
    <Layer zIndexStyle={style}>
      <AnimatedPath
        animatedProps={animatedProps}
        stroke={stroke}
        fill={fill ? stroke : "transparent"}
        strokeWidth={scaledStrokeWidth}
      />
    </Layer>
  );
};

ZPath.defaultProps = {
  transform: [],
};

export default ZPath;
