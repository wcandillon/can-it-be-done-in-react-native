import React from "react";
import Animated from "react-native-reanimated";

import Layer from "./Layer";
import { Vector3 } from "./Vector";
import ZPoint from "./ZPoint";

interface VertexProps {
  points: Animated.SharedValue<Vector3[]>;
  fill: string;
}

const Points = ({ points, fill }: VertexProps) => {
  return (
    <Layer zIndexStyle={{ zIndex: 1000 }}>
      {points.value.map((_, index) => (
        <ZPoint points={points} key={index} fill={fill} index={index} />
      ))}
    </Layer>
  );
};

export default Points;
