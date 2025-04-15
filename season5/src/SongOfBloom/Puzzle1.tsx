/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Shadow,
  rect,
  useImage,
  PathOp,
  Canvas,
  Path,
  Skia,
  Image,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { drawNoisyCircle } from "./Tools";

const { width, height } = Dimensions.get("window");
const rct = rect(0, 0, width, height);

export const Puzzle1 = () => {
  const bg = useImage(require("./assets/bg.png"));
  const mask = useImage(require("./assets/mask.png"));
  const path = useSharedValue(Skia.Path.Make());
  const gesture = Gesture.Pan()
    .onStart((e) => {
      path.value = Skia.Path.MakeFromOp(
        path.value,
        drawNoisyCircle(e),
        PathOp.Union
      )!;
    })
    .onChange((e) => {
      path.value = Skia.Path.MakeFromOp(
        path.value,
        drawNoisyCircle(e),
        PathOp.Union
      )!;
    });

  if (!bg || !mask) {
    return null;
  }
  return (
    <GestureDetector gesture={gesture}>
      <Canvas style={{ width, height }}>
        <Image image={bg} rect={rct} />
        <Path path={path} color="white">
          <Shadow dx={0} dy={0} blur={2} color="rgba(0,0,0,0.5)" inner />
        </Path>
        <Image image={mask} rect={rct} />
      </Canvas>
    </GestureDetector>
  );
};
