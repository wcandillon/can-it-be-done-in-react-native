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
import { Circle, Ellipse, Line, Path } from "react-native-svg";

import Layer from "./Layer";
import { addArc3, createPath3 } from "./Path3";
import { project, rotateZ } from "./Vector";
import Vertex from "./Vertex";
import Points from "./ZPoints";
import { useZSvg } from "./ZSvg";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);

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
  const data = useDerivedValue(() => {
    const m = processTransform3d([
      { rotateX: camera.y.value },
      { rotateY: camera.x.value },
    ]);
    const apex = project({ x: 0, y: 0, z: -length }, canvas, m);
    const rz = Math.atan2(apex.y, apex.x) - Math.PI / 2;
    const y0 = Math.sqrt(apex.x ** 2 + apex.y ** 2);
    const a = (r * canvas.x) / 2;
    const L = (length * canvas.x) / 2;
    const b = interpolate(y0, [0, L], [a, 0], Extrapolate.CLAMP); //;
    const y = b ** 2 / y0;
    const x = a * Math.sqrt(1 - y ** 2 / b ** 2);
    if (y0 < b) {
      return {
        b,
        rz,
        apex,
        a,
        points: [{ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, apex],
      };
    }
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
      b,
      rz,
      apex,
      a,
      points: [p1, p2, apex],
    };
  });
  const ellipseStyle = useAnimatedStyle(() => {
    console.log(data.value.rz);
    return {
      transform: [{ rotateZ: data.value.rz }],
      zIndex: 0,
    };
  });
  const ellipse = useAnimatedProps(() => ({
    rx: data.value.a,
    ry: data.value.b,
    fill: data.value.apex.z < 0 ? c1 : c2,
  }));
  const points = useDerivedValue(() => data.value.points);
  return (
    <>
      <Layer zIndexStyle={ellipseStyle}>
        <AnimatedEllipse animatedProps={ellipse} />
      </Layer>
      <Vertex points={points} fill={bodyColor} />
    </>
  );
};
/*
      <Vertex points={points} fill={bodyColor} />
      <Points points={debug} fill="blue" />
      */
export default ZCone;
