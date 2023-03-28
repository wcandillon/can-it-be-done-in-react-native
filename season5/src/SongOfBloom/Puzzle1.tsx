/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Shadow,
  rect,
  useImage,
  PathOp,
  Canvas,
  Path,
  Skia,
  useTouchHandler,
  useValue,
  Image,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";

import { drawNoisyCircle } from "./Tools";

const { width, height } = Dimensions.get("window");
const rct = rect(0, 0, width, height);

export const Puzzle1 = () => {
  const bg = useImage(require("./assets/bg.png"));
  const mask = useImage(require("./assets/mask.png"));
  const path = useValue(Skia.Path.Make());
  const onTouch = useTouchHandler({
    onStart: (e) => {
      path.current = Skia.Path.MakeFromOp(
        path.current,
        drawNoisyCircle(e),
        PathOp.Union
      )!;
    },
    onActive: (e) => {
      path.current = Skia.Path.MakeFromOp(
        path.current,
        drawNoisyCircle(e),
        PathOp.Union
      )!;
    },
  });
  if (!bg || !mask) {
    return null;
  }
  return (
    <Canvas style={{ width, height }} onTouch={onTouch}>
      <Image image={bg} rect={rct} />
      <Path path={path} color="white">
        <Shadow dx={0} dy={0} blur={2} color="rgba(0,0,0,0.5)" inner />
      </Path>
      <Image image={mask} rect={rct} />
    </Canvas>
  );
};
