import React from "react";
import { useDerivedValue } from "react-native-reanimated";
import { processTransform3d, Transforms3d } from "react-native-redash";

import { project } from "./Vector";
import Vertex from "./Vertex";
import { useZSvg } from "./ZSvg";

const FRONT = 0;
const BACK = 4;
const TOP_LEFT = 0;
const TOP_RIGHT = 1;
const BOTTOM_RIGHT = 2;
const BOTTOM_LEFT = 3;

interface ZBoxProps {
  width: number;
  height: number;
  depth: number;
  front: string;
  back: string;
  left: string;
  right: string;
  top: string;
  bottom: string;
}

const ZBox = ({
  width,
  height,
  depth,
  front,
  back,
  top,
  bottom,
  left,
  right,
}: ZBoxProps) => {
  const { camera, canvas } = useZSvg();
  const p1 = { x: -width / 2, y: height / 2, z: depth / 2 };
  const p2 = { x: width / 2, y: height / 2, z: depth / 2 };
  const p3 = { x: width / 2, y: -height / 2, z: depth / 2 };
  const p4 = { x: -width / 2, y: -height / 2, z: depth / 2 };
  const p5 = { x: -width / 2, y: height / 2, z: -depth / 2 };
  const p6 = { x: width / 2, y: height / 2, z: -depth / 2 };
  const p7 = { x: width / 2, y: -height / 2, z: -depth / 2 };
  const p8 = { x: -width / 2, y: -height / 2, z: -depth / 2 };
  const points = useDerivedValue(() => {
    const cameraTransform = processTransform3d([
      { perspective: 5 },
      { rotateY: camera.x.value },
      { rotateX: camera.y.value },
    ]);
    return [
      project(p1, canvas, cameraTransform),
      project(p2, canvas, cameraTransform),
      project(p3, canvas, cameraTransform),
      project(p4, canvas, cameraTransform),
      project(p5, canvas, cameraTransform),
      project(p6, canvas, cameraTransform),
      project(p7, canvas, cameraTransform),
      project(p8, canvas, cameraTransform),
    ];
  });
  const v1 = useDerivedValue(() => [
    points.value[FRONT + TOP_LEFT],
    points.value[FRONT + TOP_RIGHT],
    points.value[FRONT + BOTTOM_RIGHT],
    points.value[FRONT + BOTTOM_LEFT],
  ]);
  const v2 = useDerivedValue(() => [
    points.value[BACK + TOP_LEFT],
    points.value[BACK + TOP_RIGHT],
    points.value[BACK + BOTTOM_RIGHT],
    points.value[BACK + BOTTOM_LEFT],
  ]);
  const v3 = useDerivedValue(() => [
    points.value[FRONT + TOP_LEFT],
    points.value[FRONT + BOTTOM_LEFT],
    points.value[BACK + BOTTOM_LEFT],
    points.value[BACK + TOP_LEFT],
  ]);
  const v4 = useDerivedValue(() => [
    points.value[FRONT + TOP_RIGHT],
    points.value[FRONT + BOTTOM_RIGHT],
    points.value[BACK + BOTTOM_RIGHT],
    points.value[BACK + TOP_RIGHT],
  ]);
  const v5 = useDerivedValue(() => [
    points.value[FRONT + TOP_LEFT],
    points.value[FRONT + TOP_RIGHT],
    points.value[BACK + TOP_RIGHT],
    points.value[BACK + TOP_LEFT],
  ]);
  const v6 = useDerivedValue(() => [
    points.value[FRONT + BOTTOM_LEFT],
    points.value[FRONT + BOTTOM_RIGHT],
    points.value[BACK + BOTTOM_RIGHT],
    points.value[BACK + BOTTOM_LEFT],
  ]);
  return (
    <>
      <Vertex points={v1} fill={front} />
      <Vertex points={v2} fill={back} />
      <Vertex points={v3} fill={left} />
      <Vertex points={v4} fill={right} />
      <Vertex points={v5} fill={top} />
      <Vertex points={v6} fill={bottom} />
    </>
  );
};

export default ZBox;
