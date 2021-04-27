import React from "react";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { serialize } from "react-native-redash";
import { Path } from "react-native-svg";

import Layer from "./Layer";
import { addArc3, createPath3 } from "./Path3";
import { dist2d, project, rotateZ, projectBezier } from "./Vector";
import Vertex from "./Vertex";
import { useZSvg } from "./ZSvg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface ZConeProps {
  r: number;
  length: number;
  base: string;
  body: string;
}

// https://www.desmos.com/calculator/ocnckn71um
// https://en.wikipedia.org/wiki/Conjugate_diameters
// https://en.wikipedia.org/wiki/Ellipse#Theorem_of_Apollonios_on_conjugate_diameters
const ZCone = ({ r, length, base: baseColor, body: bodyColor }: ZConeProps) => {
  const co1 = baseColor;
  const co2 = bodyColor;
  const { camera, canvas } = useZSvg();
  const path = createPath3({ x: -r, y: 0, z: 0 });
  addArc3(path, { x: -r, y: r, z: 0 }, { x: 0, y: r, z: 0 });
  addArc3(path, { x: r, y: r, z: 0 }, { x: r, y: 0, z: 0 });
  addArc3(path, { x: r, y: -r, z: 0 }, { x: 0, y: -r, z: 0 });
  addArc3(path, { x: -r, y: -r, z: 0 }, { x: -r, y: 0, z: 0 });

  const data = useDerivedValue(() => {
    const apex = project({ x: 0, y: 0, z: -length }, canvas, camera.value);
    const rz = -Math.PI / 2 + Math.atan2(apex.y, apex.x);
    const base = projectBezier(path, canvas, camera.value);
    const y0 = dist2d(apex);
    const c1 = dist2d(base.curves[0].to);
    const c2 = dist2d(base.move);
    const a = (r * canvas.x) / 2;
    const b = Math.sqrt(c1 ** 2 + c2 ** 2 - a ** 2);
    const y = b ** 2 / y0;
    const x = a * Math.sqrt(1 - y ** 2 / b ** 2);
    if (y0 < b) {
      return {
        d: serialize(base),
        apex: apex,
        points: [{ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, apex],
      };
    }
    const p1 = rotateZ(
      {
        x: x,
        y: Math.sign(y0) * y,
        z: 0,
      },
      rz
    );
    const p2 = rotateZ(
      {
        x: -x,
        y: Math.sign(y0) * y,
        z: 0,
      },
      rz
    );
    return {
      d: serialize(base),
      apex: apex,
      points: [p1, p2, apex],
    };
  });
  const points = useDerivedValue(() => data.value.points);
  const face = useAnimatedProps(() => ({
    d: data.value.d,
    fill: data.value.apex.z < 0 ? co1 : co2,
  }));

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
