import React from "react";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { serialize } from "react-native-redash";
import { Path } from "react-native-svg";

import Layer from "./Layer";
import { addArc3, createPath3 } from "./Path3";
import { project } from "./Vector";
import { useZSvg } from "./ZSvg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface HemisphereProps {
  r: number;
  base: string;
  body: string;
}

const Hemisphere = ({
  r,
  base: baseColor,
  body: bodyColor,
}: HemisphereProps) => {
  const co1 = baseColor;
  const co2 = bodyColor;
  const { camera, canvas } = useZSvg();
  const path = createPath3({ x: -r, y: 0, z: 0 });
  addArc3(path, { x: -r, y: r, z: 0 }, { x: 0, y: r, z: 0 });
  addArc3(path, { x: r, y: r, z: 0 }, { x: r, y: 0, z: 0 });
  addArc3(path, { x: r, y: -r, z: 0 }, { x: 0, y: -r, z: 0 });
  addArc3(path, { x: -r, y: -r, z: 0 }, { x: -r, y: 0, z: 0 });

  const data = useDerivedValue(() => {
    const apex = project({ x: 0, y: 0, z: -r }, canvas, camera.value);
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
    const a = Math.PI + Math.atan2(apex.y, apex.x) - Math.PI / 4;
    const b = Math.PI + Math.atan2(apex.y, apex.x) + Math.PI / 4;
    const d = -Math.SQRT2 * Math.sqrt(apex.x ** 2 + apex.y ** 2);
    const c1 = {
      x: d * Math.cos(a),
      y: d * Math.sin(a),
      z: 0,
    };
    const c2 = {
      x: d * Math.cos(b),
      y: d * Math.sin(b),
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
    const body = createPath3(p1);
    addArc3(body, c1, apex);
    addArc3(body, c2, p2);

    return {
      base: serialize(bPath),
      body: serialize(body),
      apex,
    };
  });

  const face = useAnimatedProps(() => ({
    d: data.value.base,
    fill: data.value.apex.z < 0 ? co1 : co2,
  }));

  const body = useAnimatedProps(() => ({
    d: data.value.body,
  }));

  const bodyZIndex = useAnimatedStyle(() => ({
    zIndex: data.value.apex.z,
  }));

  return (
    <>
      <Layer zIndexStyle={{ zIndex: 0 }}>
        <AnimatedPath animatedProps={face} />
      </Layer>

      <Layer zIndexStyle={bodyZIndex}>
        <AnimatedPath animatedProps={body} fill={bodyColor} />
      </Layer>
    </>
  );
};

export default Hemisphere;
