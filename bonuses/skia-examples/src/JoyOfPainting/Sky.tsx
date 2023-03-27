import type { SkRect } from "@shopify/react-native-skia";
import {
  CornerPathEffect,
  DiscretePathEffect,
  BlurMask,
  Circle,
  Fill,
  LinearGradient,
  vec,
  Oval,
  rect,
} from "@shopify/react-native-skia";
import React from "react";
import { useWindowDimensions } from "react-native";

import { Palette } from "./Palette";

interface CloudProps {
  rct: SkRect;
}

const Cloud = ({ rct }: CloudProps) => {
  const { width } = useWindowDimensions();
  return (
    <Oval rect={rct}>
      <LinearGradient
        colors={["white", "rgba(255, 255, 255, 0)", "white"]}
        start={vec(-200, 0)}
        end={vec(width + 200, 0)}
      />
      <CornerPathEffect r={60} />
      <DiscretePathEffect length={20} deviation={10} />
    </Oval>
  );
};

const Sun = () => {
  return (
    <Circle color={Palette.sunlightWishper} r={125} c={vec(350, 200)}>
      <BlurMask blur={20} style="solid" />
    </Circle>
  );
};

export const Sky = () => {
  const { height } = useWindowDimensions();
  return (
    <>
      <Fill>
        <LinearGradient
          colors={["#B4D7EB", "#87DBF3"]}
          start={vec(0, 0)}
          end={vec(0, height * 0.4)}
        />
      </Fill>
      <Sun />
      <Cloud rct={rect(-150, 50, 350, 50)} />
      <Cloud rct={rect(250, 125, 350, 100)} />
      <Cloud rct={rect(-150, 200, 350, 120)} />
    </>
  );
};
