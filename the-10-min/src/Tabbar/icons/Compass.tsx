import React from "react";
import Svg, { Circle, G, Path } from "react-native-svg";
import { Colors, ICON_SIZE, IconProps } from "./Constants";

export default ({ active }: IconProps) => {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 22 22">
      <G
        transform="translate(1 1)"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Circle
          cx={10}
          cy={10}
          r={10}
          stroke={active ? Colors.primary : Colors.border}
          strokeWidth={2}
          fill={active ? Colors.primary : "none"}
        />
        <Path
          stroke={active ? "white" : Colors.border}
          strokeWidth={2}
          fill="none"
          d="M14.48 6l-2.12 6.36L6 14.48l2.12-6.36z"
        />
      </G>
    </Svg>
  );
};
