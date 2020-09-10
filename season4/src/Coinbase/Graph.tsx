import React from "react";
import { View, Dimensions } from "react-native";
import * as shape from "d3-shape";
import Svg, { Path } from "react-native-svg";

import { Prices } from "./Model";

const SIZE = Dimensions.get("window").width;

interface GraphProps {
  prices: Prices;
}

const Graph = ({ prices }: GraphProps) => {
  const d = shape
    .line()
    .x(([x]) => scale(x, domain.x, range.x))
    .y(([, y]) => scale(y, domain.y, range.y))
    .curve(shape.curveBasis)(data) as string;
  const path = parsePath(d);
  return (
    <View>
      <Svg>
        <Path {...{ d }} />
      </Svg>
    </View>
  );
};

export default Graph;
