import React from "react";
import { processColor } from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { processTransform3d, serialize } from "react-native-redash";
import { Path } from "react-native-svg";

import Layer from "./Layer";
import { addArc3, close3, createPath3 } from "./Path3";
import { project } from "./Vector";
import { useZSvg } from "./ZSvg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface ZConeProps {
  r: number;
  base: string;
  body: string;
}

const ZCone = ({ r, base: baseColor, body: bodyColor }: ZConeProps) => {
  const c1 = processColor(baseColor);
  const c2 = processColor(bodyColor);
  const { camera, canvas } = useZSvg();
  const basePath = createPath3({ x: -r, y: 0, z: 0 });
  addArc3(basePath, { x: -r, y: r, z: 0 }, { x: 0, y: r, z: 0 });
  addArc3(basePath, { x: r, y: r, z: 0 }, { x: r, y: 0, z: 0 });
  addArc3(basePath, { x: r, y: -r, z: 0 }, { x: 0, y: -r, z: 0 });
  addArc3(basePath, { x: -r, y: -r, z: 0 }, { x: -r, y: 0, z: 0 });

  const bodyPath = createPath3({ x: -r, y: 0, z: 0 });
  addArc3(bodyPath, { x: -r, y: 0, z: -r }, { x: 0, y: 0, z: -r });
  addArc3(bodyPath, { x: r, y: 0, z: -r }, { x: r, y: 0, z: 0 });

  const data = useDerivedValue(() => {
    const cameraTransform = processTransform3d([
      //   { perspective: 5 },
      { rotateY: camera.x.value },
      { rotateX: camera.y.value },
    ]);
    const apex = project({ x: 0, y: 0, z: -r }, canvas, cameraTransform);
    const alpha = Math.PI + Math.atan2(apex.y, apex.x);
    const p1 = {
      x: ((r * canvas.x) / 2) * Math.cos(alpha - Math.PI / 2),
      y: ((r * canvas.x) / 2) * Math.sin(alpha - Math.PI / 2),
      z: 0,
    };
    const p2 = {
      x: ((r * canvas.x) / 2) * Math.cos(alpha + Math.PI / 2),
      y: ((r * canvas.x) / 2) * Math.sin(alpha + Math.PI / 2),
      z: 0,
    };
    const basePathPrj = {
      move: project(basePath.move, canvas, cameraTransform),
      curves: basePath.curves.map((curve) => ({
        c1: project(curve.c1, canvas, cameraTransform),
        c2: project(curve.c2, canvas, cameraTransform),
        to: project(curve.to, canvas, cameraTransform),
      })),
      close: basePath.close,
    };

    const bodyPathPrj = {
      move: project(bodyPath.move, canvas, cameraTransform),
      curves: bodyPath.curves.map((curve) => ({
        c1: project(curve.c1, canvas, cameraTransform),
        c2: project(curve.c2, canvas, cameraTransform),
        to: project(curve.to, canvas, cameraTransform),
      })),
      close: bodyPath.close,
    };

    return {
      zIndex: apex.z,
      base: serialize(basePathPrj),
      body: serialize(bodyPathPrj),
    };
  });

  const base = useAnimatedProps(() => ({
    d: data.value.base,
    fill: data.value.zIndex < 0 ? c1 : c2,
  }));

  const body = useAnimatedProps(() => ({
    d: data.value.body,
  }));

  return (
    <>
      <Layer zIndexStyle={{ zIndex: 0 }}>
        <AnimatedPath animatedProps={base} />
      </Layer>
      <Layer zIndexStyle={{ zIndex: 0 }}>
        <AnimatedPath animatedProps={body} fill={bodyColor} />
      </Layer>
    </>
  );
};

export default ZCone;
