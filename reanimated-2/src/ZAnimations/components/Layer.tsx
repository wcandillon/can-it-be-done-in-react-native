import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import Svg from "react-native-svg";

import { useZSvg } from "./ZSvg";

interface LayerProps {
  zIndexStyle: { zIndex: number };
  children: ReactNode;
}

const Layer = ({ zIndexStyle, children }: LayerProps) => {
  const { canvas } = useZSvg();
  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, zIndexStyle]}
      pointerEvents="none"
    >
      <Svg
        style={StyleSheet.absoluteFill}
        viewBox={[-canvas.x / 2, -canvas.y / 2, canvas.x, canvas.y].join(" ")}
      >
        {children}
      </Svg>
    </Animated.View>
  );
};

export default Layer;
