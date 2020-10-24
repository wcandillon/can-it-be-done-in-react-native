import React from "react";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import {
  addLine,
  avg,
  processTransform3d,
  serialize,
  Transforms3d,
} from "react-native-redash";
import { Circle, Path, Polygon } from "react-native-svg";

import {
  createPath3,
  addArc3,
  addLine3,
  serialize3,
  close3,
  Path3,
} from "./Path3";
import { project } from "./Vector";
import { useZSvg } from "./ZSvg";
import ZPath from "./ZPath";
import Layer from "./Layer";
import Vertex from "./Vertex";

interface ZBoxProps {
  r: number;
  length: number;
  front: string;
  back: string;
  body: string;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

const ZCylinder = ({ r, length, left, front, body }: ZBoxProps) => {
  const { camera, canvas } = useZSvg();
  const z = length / 2;
  const e = createPath3({ x: -r, y: 0, z });
  addArc3(e, { x: -r, y: r, z }, { x: 0, y: r, z });
  addArc3(e, { x: r, y: r, z }, { x: r, y: 0, z });
  addArc3(e, { x: r, y: -r, z }, { x: 0, y: -r, z });
  addArc3(e, { x: -r, y: -r, z }, { x: -r, y: 0, z });
  const shapes = useDerivedValue(() => {
    const cameraTransform = processTransform3d([
      //   { perspective: 5 },
      { rotateY: camera.x.value },
      { rotateX: camera.y.value },
    ]);
    const ep = {
      move: project(e.move, canvas, cameraTransform),
      curves: e.curves.map((curve) => ({
        c1: project(curve.c1, canvas, cameraTransform),
        c2: project(curve.c2, canvas, cameraTransform),
        to: project(curve.to, canvas, cameraTransform),
      })),
      close: false,
    };
    const center = project({ x: 0, y: 0, z }, canvas, cameraTransform);
    const alpha = Math.PI + Math.atan2(center.y, center.x);
    const p1 = {
      x: center.x + ((r * canvas.x) / 2) * Math.cos(alpha - Math.PI / 2),
      y: center.y + ((r * canvas.x) / 2) * Math.sin(alpha - Math.PI / 2),
      z: 0,
    };
    const p2 = {
      x: center.x + ((r * canvas.x) / 2) * Math.cos(alpha + Math.PI / 2),
      y: center.y + ((r * canvas.x) / 2) * Math.sin(alpha + Math.PI / 2),
      z: 0,
    };
    return {
      e: ep,
      points: [p1, p2],
      head: project({ x: 0, y: 0, z: -z }, canvas, cameraTransform),
    };
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      d: serialize(shapes.value.e),
    };
  });
  const zIndex = useAnimatedStyle(() => ({
    zIndex: avg(
      [shapes.value.e.move.z].concat(
        shapes.value.e.curves.map(({ c1, c2, to }) => avg([c1.z, c2.z, to.z]))
      )
    ),
  }));

  const points = useDerivedValue(() => {
    return [shapes.value.head].concat(shapes.value.points);
  });
  return (
    <>
      <Layer zIndexStyle={zIndex}>
        <AnimatedPath animatedProps={animatedProps} fill={body} />
      </Layer>
      <Vertex points={points} fill={front} />
    </>
  );
};
/*

  const path = createPath3({ x: -r, y: 0, z });
  addArc3(path, { x: -r, y: r, z }, { x: 0, y: r, z });
  addArc3(path, { x: r, y: r, z }, { x: r, y: 0, z });
  addLine3(path, { x: 0, y: 0, z: -z });
  close3(path);


  const path = createPath3({ x: -r, y: 0, z });
  addArc3(path, { x: -r, y: r, z }, { x: 0, y: r, z });
  addArc3(path, { x: r, y: r, z }, { x: r, y: 0, z });
  addLine3(path, { x: r, y: 0, z: -z });
  addArc3(path, { x: r, y: r, z: -z }, { x: 0, y: r, z: -z });
  addArc3(path, { x: -r, y: r, z: -z }, { x: -r, y: 0, z });
  addLine3(path, { x: -r, y: 0, z });
  */
export default ZCylinder;
