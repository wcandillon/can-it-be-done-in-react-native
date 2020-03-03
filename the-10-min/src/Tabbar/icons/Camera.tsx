import * as React from "react";
import Svg, { Circle, G, Path } from "react-native-svg";
import { Colors, ICON_SIZE, IconProps } from "./Constants";

export default ({ active }: IconProps) => {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 20">
      <G
        transform="translate(1 1)"
        stroke={active ? Colors.primary : Colors.border}
        strokeWidth={2}
        fill={active ? Colors.primary : "none"}
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M22 16a2 2 0 01-2 2H2a2 2 0 01-2-2V5a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z" />
        <Circle cx={11} cy={10} r={4} fill="white" />
      </G>
    </Svg>
  );
};
