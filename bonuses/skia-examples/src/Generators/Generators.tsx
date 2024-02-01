import { Canvas, Fill } from "@shopify/react-native-skia";
import React from "react";

export const Generators = () => {
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color="red" />
    </Canvas>
  );
};
