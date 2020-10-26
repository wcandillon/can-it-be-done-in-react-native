import React from "react";
import { processColor } from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { multiply4, processTransform3d, serialize } from "react-native-redash";
import { Circle, Path } from "react-native-svg";

import Layer from "./Layer";
import { addArc3, createPath3 } from "./Path3";
import { project } from "./Vector";
import Vertex from "./Vertex";
import Points from "./ZPoints";
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
  const c1 = processColor(baseColor);
  const c2 = processColor(bodyColor);
  const { camera, canvas } = useZSvg();
  const path = createPath3({ x: -r, y: 0, z: 0 });
  addArc3(path, { x: -r, y: r, z: 0 }, { x: 0, y: r, z: 0 });
  addArc3(path, { x: r, y: r, z: 0 }, { x: r, y: 0, z: 0 });
  addArc3(path, { x: r, y: -r, z: 0 }, { x: 0, y: -r, z: 0 });
  addArc3(path, { x: -r, y: -r, z: 0 }, { x: -r, y: 0, z: 0 });

  const data = useDerivedValue(() => {
    const transformMatrix = camera.value;
    const apex = project({ x: 0, y: 0, z: -length }, canvas, transformMatrix);

    const bPath = {
      move: project(path.move, canvas, transformMatrix),
      curves: path.curves.map((curve) => ({
        c1: project(curve.c1, canvas, transformMatrix),
        c2: project(curve.c2, canvas, transformMatrix),
        to: project(curve.to, canvas, transformMatrix),
      })),
      close: path.close,
    };
    const alpha = Math.atan2(apex.y, apex.x);
    const rs = (r * canvas.x) / 2;
    const p1 = {
      x: rs * Math.cos(alpha - Math.PI / 2),
      y: rs * Math.sin(alpha - Math.PI / 2),
      z: 0,
    };
    const p2 = {
      x: rs * Math.cos(alpha + Math.PI / 2),
      y: rs * Math.sin(alpha + Math.PI / 2),
      z: 0,
    };
    return {
      body: serialize(bPath),
      apex: apex,
      points: [p1, p2, apex],
    };
  });

  const face = useAnimatedProps(() => ({
    d: data.value.body,
    fill: data.value.apex.z < 0 ? c1 : c2,
  }));

  const points = useDerivedValue(() => data.value.points);

  const animatedProps = useAnimatedProps(() => ({
    cx: data.value.apex.x,
    cy: data.value.apex.y,
  }));
  return (
    <>
      <Layer zIndexStyle={{ zIndex: 0 }}>
        <AnimatedPath animatedProps={face} />
      </Layer>
      <Vertex points={points} fill={bodyColor} />
      <Layer zIndexStyle={{ zIndex: 10 }}>
        <AnimatedCircle animatedProps={animatedProps} r={5} fill="blue" />
        <Circle
          r={(r * canvas.x) / 2}
          cx={0}
          cy={0}
          stroke="blue"
          strokeWidth={1}
        />
      </Layer>
      <Points points={points} fill="green" />
    </>
  );
};

export default ZCone;
