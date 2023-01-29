import { Canvas, Image, rect, useImage } from "@shopify/react-native-skia";
import type { ReactNode } from "react";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bg = require("./assets/bg.png");
const { width, height } = Dimensions.get("window");
const rct = rect(0, 0, width, height);

interface BackgroundProps {
  children: ReactNode;
}

export const Background = ({ children }: BackgroundProps) => {
  const image = useImage(bg);
  if (!image) {
    return null;
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Canvas style={StyleSheet.absoluteFill}>
        <Image image={image} rect={rct} fit="cover" />
      </Canvas>
      {children}
    </View>
  );
};
