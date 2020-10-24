import React from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { processTransform3d, serialize } from "react-native-redash";
import { Circle, Path } from "react-native-svg";

import Layer from "./Layer";
import { addArc3, createPath3 } from "./Path3";
import { project } from "./Vector";
import { useZSvg } from "./ZSvg";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ZConeProps {
  r: number;
  length: number;
  base: string;
  body: string;
}

const ZCone = ({ r, length, base: baseColor, body: bodyColor }: ZConeProps) => {
  const { camera, canvas } = useZSvg();
  const path = createPath3({ x: -r, y: 0, z: 0 });
  addArc3(path, { x: -r, y: r, z: 0 }, { x: 0, y: r, z: 0 });
  addArc3(path, { x: r, y: r, z: 0 }, { x: r, y: 0, z: 0 });
  addArc3(path, { x: r, y: -r, z: 0 }, { x: 0, y: -r, z: 0 });
  addArc3(path, { x: -r, y: -r, z: 0 }, { x: -r, y: 0, z: 0 });

  const data = useDerivedValue(() => {
    const cameraTransform = processTransform3d([
      //   { perspective: 5 },
      { rotateY: camera.x.value },
      { rotateX: camera.y.value },
    ]);
    const apex = project({ x: 0, y: 0, z: -length }, canvas, cameraTransform);
    return {
      body: serialize({
        move: project(path.move, canvas, cameraTransform),
        curves: path.curves.map((curve) => ({
          c1: project(curve.c1, canvas, cameraTransform),
          c2: project(curve.c2, canvas, cameraTransform),
          to: project(curve.to, canvas, cameraTransform),
        })),
        close: path.close,
      }),
      base: [apex],
    };
  });

  const face = useAnimatedProps(() => ({
    d: data.value.body,
  }));

  const faceZ = useAnimatedStyle(() => ({
    zIndex: data.value.base[0].z > 0 ? 1 : 0,
  }));

  const backface = useAnimatedProps(() => ({
    d: data.value.body,
  }));

  const backfaceZ = useAnimatedStyle(() => ({
    zIndex: data.value.base[0].z > 0 ? 0 : 1,
  }));

  const apex = useAnimatedProps(() => {
    return {
      cx: data.value.base[0].x,
      cy: data.value.base[0].y,
    };
  });

  const zIndexBody = useAnimatedStyle(() => ({
    zIndex: data.value.base[0].z,
  }));

  return (
    <>
      <Layer zIndexStyle={faceZ}>
        <AnimatedPath animatedProps={face} fill={baseColor} />
      </Layer>
      <Layer zIndexStyle={backfaceZ}>
        <AnimatedPath animatedProps={backface} fill={bodyColor} />
      </Layer>
      <Layer zIndexStyle={zIndexBody}>
        <AnimatedCircle animatedProps={apex} r={5} fill="blue" />
      </Layer>
    </>
  );
};

export default ZCone;
