import React from "react";
import { processColor, StyleSheet } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { processTransform3d, serialize } from "react-native-redash";
import { Circle, Path } from "react-native-svg";

import Layer from "./Layer";
import { addArc3, createPath3 } from "./Path3";
import { project, rotateZ } from "./Vector";
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
    const m = processTransform3d([
      { rotateX: camera.y.value },
      //{ rotateY: camera.x.value },
    ]);
    const apex = project({ x: 0, y: 0, z: -length }, canvas, m);

    const bPath = {
      move: project(path.move, canvas, m),
      curves: path.curves.map((curve) => ({
        c1: project(curve.c1, canvas, m),
        c2: project(curve.c2, canvas, m),
        to: project(curve.to, canvas, m),
      })),
      close: path.close,
    };
    const rs = (r * canvas.x) / 2;
    const a1 = bPath.move;
    const b1 = bPath.curves[0].to;
    const a2 = Math.sqrt(a1.x ** 2 + a1.y ** 2);
    const b2 = Math.sqrt(b1.x ** 2 + b1.y ** 2);
    const b = Math.min(a2, b2);
    const a = Math.max(a2, b2);
    // https://www.desmos.com/calculator/ocnckn71um
    const y0 = Math.sqrt(apex.x ** 2 + apex.y ** 2);
    const y = b ** 2 / y0;
    if (y0 < rs) {
      return {
        body: serialize(bPath),
        apex: apex,
        points: [{ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, apex],
      };
    }
    const x = a * Math.sqrt(1 - y ** 2 / b ** 2);
    const rz = Math.atan2(apex.y, apex.x) - Math.PI / 2;
    console.log(rz);
    const p1 = rotateZ(
      {
        x: x,
        y: y,
        z: 0,
      },
      rz
    );
    const p2 = rotateZ(
      {
        x: -x,
        y: y,
        z: 0,
      },
      rz
    );
    return {
      body: serialize(bPath),
      apex: apex,
      points: [p1, p2, apex],
    };
  });

  const face = useAnimatedProps(() => ({
    d: data.value.body,
    fill: data.value.apex.z < 0 ? c1 : c2,
    //stroke: data.value.apex.z < 0 ? c1 : c2,
    //strokeWidth: 4,
    //fillOpacity: 0.8,
  }));

  const points = useDerivedValue(() => data.value.points);

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
