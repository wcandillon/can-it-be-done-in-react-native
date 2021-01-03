import React from "react";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";
import { avg } from "react-native-redash";
import { Polygon } from "react-native-svg";

import Layer from "./Layer";
import { Vector3 } from "./Vector";

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

interface VertexProps {
  points: Animated.SharedValue<Vector3[]>;
  fill: string;
}

const Vertex = ({ points, fill }: VertexProps) => {
  const animatedProps = useAnimatedProps(() => ({
    points: points.value.map(({ x, y }) => [x, y].join(", ")).join(" "),
  }));
  const zIndex = useAnimatedStyle(() => ({
    zIndex: avg(points.value.map(({ z }) => z)),
  }));
  return (
    <Layer zIndexStyle={zIndex}>
      <AnimatedPolygon animatedProps={animatedProps} fill={fill} />
    </Layer>
  );
};

export default Vertex;
