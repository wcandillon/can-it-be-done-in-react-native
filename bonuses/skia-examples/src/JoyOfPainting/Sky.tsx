import type { SkRect } from "@shopify/react-native-skia";
import {
  SumPathEffect,
  CornerPathEffect,
  DiscretePathEffect,
  center,
  Fill,
  LinearGradient,
  vec,
  Oval,
  rect,
} from "@shopify/react-native-skia";
import React from "react";
import { useWindowDimensions } from "react-native";

interface CloudProps {
  rct: SkRect;
  flip?: boolean;
}

const Cloud = ({ rct, flip = false }: CloudProps) => {
  return (
    <Oval
      rect={rct}
      origin={center(rct)}
      transform={[{ scaleX: flip ? -1 : 1 }]}
    >
      <LinearGradient
        colors={["white", "rgba(255, 255, 255, 0)"]}
        start={vec(rct.x, rct.y)}
        end={vec(rct.x + rct.width, rct.y + rct.height)}
      />
      <SumPathEffect>
        <CornerPathEffect r={50} />
        <DiscretePathEffect length={25} deviation={10} />
      </SumPathEffect>
    </Oval>
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
      <Cloud rct={rect(-150, 64, 350, 50)} />
      <Cloud rct={rect(250, 128, 350, 100)} flip />
      <Cloud rct={rect(-150, 200, 350, 120)} />
    </>
  );
};
