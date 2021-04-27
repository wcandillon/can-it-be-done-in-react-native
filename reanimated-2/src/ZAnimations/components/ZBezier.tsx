import React from "react";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";
import { serialize, avg } from "react-native-redash";
import { Path } from "react-native-svg";

import { Path3 } from "./Path3";
import Layer from "./Layer";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface ZPathProps {
  path: Animated.SharedValue<Path3>;
  stroke: string;
  strokeWidth: number;
  fill?: boolean;
}

const ZPath = ({ path, stroke, strokeWidth, fill }: ZPathProps) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      d: serialize(path.value),
    };
  });
  const style = useAnimatedStyle(() => ({
    zIndex: avg(
      [path.value.move.z].concat(
        path.value.curves.map(({ c1, c2, to }) => avg([c1.z, c2.z, to.z]))
      )
    ),
  }));
  return (
    <Layer zIndexStyle={style}>
      <AnimatedPath
        animatedProps={animatedProps}
        stroke={stroke}
        fill={fill ? stroke : "transparent"}
        strokeWidth={strokeWidth}
      />
    </Layer>
  );
};

ZPath.defaultProps = {
  transform: [],
};

export default ZPath;
