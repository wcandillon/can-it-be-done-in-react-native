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
import { project, rotateZ } from "./Vector";
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
  const co1 = processColor(baseColor);
  const co2 = processColor(bodyColor);
  const { camera, canvas } = useZSvg();
  const path = createPath3({ x: -r, y: 0, z: 0 });
  addArc3(path, { x: -r, y: r, z: 0 }, { x: 0, y: r, z: 0 });
  addArc3(path, { x: r, y: r, z: 0 }, { x: r, y: 0, z: 0 });
  addArc3(path, { x: r, y: -r, z: 0 }, { x: 0, y: -r, z: 0 });
  addArc3(path, { x: -r, y: -r, z: 0 }, { x: -r, y: 0, z: 0 });

  const data = useDerivedValue(() => {
    const apex3d = project({ x: 0, y: 0, z: -length }, canvas, camera.value);
    const apex = { x: 0, y: Math.sqrt(apex3d.x ** 2 + apex3d.y ** 2), z: 0 };
    const rz = -Math.PI / 2 + Math.atan2(apex3d.y, apex3d.x);
    const bPath = {
      move: project(path.move, canvas, camera.value),
      curves: path.curves.map((curve) => ({
        c1: project(curve.c1, canvas, camera.value),
        c2: project(curve.c2, canvas, camera.value),
        to: project(curve.to, canvas, camera.value),
      })),
      close: path.close,
    };

    //const n = project({ x: 0, y: length, z: 0 }, canvas, m);
    //const eccenAngle = Math.acos(nDist / scale);
    // const e = Math.abs(Math.sin(Math.atan2(n.y, n.z)));
    // console.log(e);
    const y0 = Math.sqrt(apex.x ** 2 + apex.y ** 2);
    // const L = (length * canvas.x) / 2;

    const c1v = project({ x: 0, y: r, z: 0 }, canvas, camera.value);
    const c1 = Math.sqrt(c1v.x ** 2 + c1v.y ** 2);
    const c2v = project({ x: -r, y: 0, z: 0 }, canvas, camera.value);
    const c2 = Math.sqrt(c2v.x ** 2 + c2v.y ** 2);
    const a = (r * canvas.x) / 2;
    const b = Math.sqrt(c1 ** 2 + c2 ** 2 - a ** 2);

    const y = b ** 2 / y0;
    const x = a * Math.sqrt(1 - y ** 2 / b ** 2);
    if (y0 < b) {
      console.log("Invisible");
      return {
        d: serialize(bPath),
        apex: apex3d,
        points: [{ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, apex3d],
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
      d: serialize(bPath),
      apex: apex3d,
      points: [p1, p2, apex3d],
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
