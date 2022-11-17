/* eslint-disable max-len */
import { Canvas, Easing, Fill, useLoop } from "@shopify/react-native-skia";
import React from "react";

import { prepare, GradientAlongPath } from "./PathAlongGradient";

const hello = prepare(
  "M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
);

export const PathGradient = () => {
  const progress = useLoop({
    duration: 3000,
    easing: Easing.inOut(Easing.ease),
  });
  return (
    <Canvas style={{ flex: 1 }} mode="continuous" debug>
      <Fill color="black" />
      <GradientAlongPath {...hello} progress={progress} />
    </Canvas>
  );
};
