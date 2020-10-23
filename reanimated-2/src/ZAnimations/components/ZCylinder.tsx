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
import { Circle, Path } from "react-native-svg";

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

interface ZBoxProps {
  r: number;
  length: number;
  front: string;
  back: string;
  body: string;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

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
    const head = project({ x: 0, y: 0, z: -z }, canvas, cameraTransform);
    const center = project({ x: 0, y: 0, z }, canvas, cameraTransform);

    return {
      e: ep,
      head,
      center,
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

  const animatedProps1 = useAnimatedProps(() => {
    return {
      cx: shapes.value.e.move.x,
      cy: shapes.value.e.move.y,
    };
  });
  const animatedProps2 = useAnimatedProps(() => {
    return {
      cx: shapes.value.e.curves[0].to.x,
      cy: shapes.value.e.curves[0].to.y,
    };
  });
  const animatedProps3 = useAnimatedProps(() => {
    return {
      cx: shapes.value.e.curves[1].to.x,
      cy: shapes.value.e.curves[1].to.y,
    };
  });
  const animatedProps4 = useAnimatedProps(() => {
    return {
      cx: shapes.value.e.curves[2].to.x,
      cy: shapes.value.e.curves[2].to.y,
    };
  });
  const animatedProps5 = useAnimatedProps(() => {
    return {
      cx: shapes.value.head.x,
      cy: shapes.value.head.y,
    };
  });
  const animatedProps6 = useAnimatedProps(() => {
    return {
      cx: shapes.value.center.x,
      cy: shapes.value.center.y,
    };
  });
  return (
    <>
      <Layer zIndexStyle={zIndex}>
        <AnimatedPath animatedProps={animatedProps} fill={body} />
        <AnimatedCircle r={5} fill="red" animatedProps={animatedProps1} />
        <AnimatedCircle r={5} fill="blue" animatedProps={animatedProps2} />
        <AnimatedCircle r={5} fill="green" animatedProps={animatedProps3} />
        <AnimatedCircle r={5} fill="violet" animatedProps={animatedProps4} />
        <AnimatedCircle r={5} fill="black" animatedProps={animatedProps5} />
        <AnimatedCircle r={5} fill="yellow" animatedProps={animatedProps6} />
      </Layer>
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
