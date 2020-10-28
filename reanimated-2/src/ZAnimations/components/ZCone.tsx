import React from "react";
import { processColor } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { serialize } from "react-native-redash";
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
    const a1 = bPath.move;
    const b1 = bPath.curves[0].to;
    const a2 = Math.sqrt(a1.x ** 2 + a1.y ** 2);
    const b2 = Math.sqrt(b1.x ** 2 + b1.y ** 2);
    const minor = Math.min(a2, b2);
    const major = Math.max(a2, b2);
    // https://www.mathopenref.com/ellipsefoci.html#:~:text=Foci%20(focus%20points)%20of%20an,used%20in%20its%20formal%20definition.&text=The%20foci%20always%20lie%20on,foci%20are%20at%20the%20center.
    const F = Math.sqrt(major ** 2 - minor ** 2);
    const l = minor ** 2 / major;
    const L = (length * canvas.x) / 2;
    const apexDist = Math.sqrt(apex.x ** 2 + apex.y ** 2);
    const dist = apexDist - minor;
    const rs = (r * canvas.x) / 2;
    const alpha = Math.atan2(apex.y, apex.x);
    const visible = apexDist > minor;
    const beta = Math.PI / 2; //Math.atan2(F, rs);
    const p1 = { x: l, y: F, z: 0 };
    const p2 = { x: l, y: -F, z: 0 };
    return {
      body: serialize(bPath),
      apex: apex,
      points: [p1, p2, apex],
      foci: [
        { x: 0, y: F, z: 0 },
        { x: 0, y: -F, z: 0 },
        { x: l, y: F, z: 0 },
        { x: l, y: -F, z: 0 },
      ],
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
  const foci = useDerivedValue(() => data.value.foci);
  const animatedProps = useAnimatedProps(() => ({
    r: data.value.foci[0].y,
    stroke: "blue",
    strokeWidth: 1,
  }));
  return (
    <>
      <Layer zIndexStyle={{ zIndex: 0 }}>
        <AnimatedPath animatedProps={face} />
      </Layer>
      <Vertex points={points} fill={bodyColor} />
      <Points points={foci} fill={bodyColor} />
      <Layer zIndexStyle={{ zIndex: 0 }}>
        <Circle stroke="blue" strokeWidth={1} r={(r * canvas.x) / 2} />
        <AnimatedCircle animatedProps={animatedProps} />
      </Layer>
      <Layer zIndexStyle={{ zIndex: 0 }}>
        <Circle stroke="blue" strokeWidth={1} r={(r * canvas.x) / 2} />
      </Layer>
    </>
  );
};

export default ZCone;
