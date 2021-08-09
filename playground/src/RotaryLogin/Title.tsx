import React from "react";
import {
  processTransform2d,
  serializeToSVGMatrixArray,
} from "react-native-redash";
import { G, Text } from "react-native-svg";

import { RADIUS, center } from "./Quadrant";

const fontSize = 26;

const Title = () => {
  return (
    <G
      transform={serializeToSVGMatrixArray(
        processTransform2d([{ translateY: -RADIUS - 100 }])
      )}
    >
      <Text
        fontWeight="800"
        fontSize={fontSize}
        fill="black"
        x={center.x - RADIUS}
        y={center.y - fontSize / 2}
      >
        ENTER
      </Text>
      <Text
        fontWeight="800"
        fontSize={fontSize}
        fill="black"
        x={center.x - RADIUS}
        y={center.y + fontSize / 2}
      >
        PASSCODE
      </Text>
    </G>
  );
};

export default Title;
