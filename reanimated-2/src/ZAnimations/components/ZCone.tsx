import React from "react";
import { processColor } from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { serialize } from "react-native-redash";
import { Path } from "react-native-svg";

import Layer from "./Layer";
import { addArc3, createPath3 } from "./Path3";
import { project } from "./Vector";
import Vertex from "./Vertex";
import { useZSvg } from "./ZSvg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface ZConeProps {
  r: number;
  length: number;
  base: string;
  body: string;
}

const ZCone = ({ r, length, base: baseColor, body: bodyColor }: ZConeProps) => {
  const c1 = processColor(baseColor);
  const c2 = processColor(bodyColor);
  const { camera, canvas } = useZSvg();
  const path = createPath3({ x: -r, y: 0, z: 0 });
  addArc3(path, { x: -r, y: r, z: 0 }, { x: 0, y: r, z: 0 });
  addArc3(path, { x: r, y: r, z: 0 }, { x: r, y: 0, z: 0 });
  addArc3(path, { x: r, y: -r, z: 0 }, { x: 0, y: -r, z: 0 });
  addArc3(path, { x: -r, y: -r, z: 0 }, { x: -r, y: 0, z: 0 });

  const data = useDerivedValue(() => {
    const apex = project({ x: 0, y: 0, z: -length }, canvas, camera.value);
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
    const bPath = {
      move: project(path.move, canvas, camera.value),
      curves: path.curves.map((curve) => ({
        c1: project(curve.c1, canvas, camera.value),
        c2: project(curve.c2, canvas, camera.value),
        to: project(curve.to, canvas, camera.value),
      })),
      close: path.close,
    };
    return {
      body: serialize(bPath),
      base: [apex, p1, p2],
      points: [
        p1,
        p2,
        bPath.curves[0].to,
        bPath.curves[1].to,
        bPath.curves[2].to,
        bPath.curves[3].to,
      ],
    };
  });

  const face = useAnimatedProps(() => ({
    d: data.value.body,
    fill: data.value.base[0].z < 0 ? c1 : c2,
  }));

  const points = useDerivedValue(() => data.value.base);

  return (
    <>
      <Layer zIndexStyle={{ zIndex: 0 }}>
        <AnimatedPath animatedProps={face} />
      </Layer>
      <Vertex points={points} fill={bodyColor} />
    </>
  );
};

export default ZCone;
