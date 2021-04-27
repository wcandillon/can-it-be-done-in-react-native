import React, { useRef } from "react";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  serialize,
  avg,
  Transforms3d,
  processTransform3d,
  multiply4,
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
  progress: Animated.SharedValue<number>;
}

const ZPath = ({
  path,
  stroke,
  strokeWidth,
  fill,
  transform,
  progress,
}: ZPathProps) => {
  const ref = useRef<Path>(null);
  const length = useSharedValue(0);
  const { camera, canvas } = useZSvg();
  const path2 = useDerivedValue(
    (): Path3 => {
      const transformMatrix = multiply4(
        camera.value,
        processTransform3d(transform)
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
      strokeDashoffset:
        progress.value === 1 ? 0 : length.value - length.value * progress.value,
      strokeDasharray: progress.value === 1 ? 0 : length.value,
    };
  });
  const scaledStrokeWidth = (strokeWidth * canvas.x) / 2;
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
        ref={ref}
        animatedProps={animatedProps}
        stroke={stroke}
        fill={fill ? stroke : "transparent"}
        strokeWidth={scaledStrokeWidth}
        onLayout={() => {
          if (progress.value < 1) {
            length.value = ref.current!.getTotalLength();
          }
        }}
      />
    </Layer>
  );
};

ZPath.defaultProps = {
  transform: [],
  progress: { value: 1 },
};

export default ZPath;
