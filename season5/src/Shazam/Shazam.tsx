import { Canvas, Image, rect, useImage } from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const rct = rect(0, 0, width, height);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const background = require("./assets/background.png");

export const Shazam = () => {
  const image = useImage(background);
  if (!image) {
    return null;
  }
  return (
    <Canvas style={{ width, height }}>
      <Image image={image} rect={rct} fit="cover" />
    </Canvas>
  );
};
