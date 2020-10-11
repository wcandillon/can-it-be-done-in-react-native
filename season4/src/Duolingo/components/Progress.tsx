import * as React from "react";
import { View, Dimensions } from "react-native";
import Svg, { G, Path } from "react-native-svg";

import { CROSS_SIZE } from "./Cross";
import { HEART_SIZE } from "./Heart";

const width = Dimensions.get("window").width - 16 * 4 - CROSS_SIZE - HEART_SIZE;

const SvgComponent = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Svg width={width} height={(width * 11) / 111} viewBox="0 0 111 11">
        <G fill="none" fillRule="evenodd" strokeLinecap="round">
          <Path d="M5.5 5.5h99.55" stroke="#E4E4E4" strokeWidth={10} />
          <Path d="M5.5 5.5H25" stroke="#58CC00" strokeWidth={10} />
          <Path d="M8.5 5.5h13.816" stroke="#7AD633" strokeWidth={5} />
        </G>
      </Svg>
    </View>
  );
};

export default SvgComponent;
