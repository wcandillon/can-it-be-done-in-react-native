/* eslint-disable max-len */
import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

export const HEART_SIZE = 35;

const Heart = () => {
  return (
    <Svg width={35} height={35} viewBox="0 0 24 22" fill="none">
      <Path
        d="M20.84 3.61a5.5 5.5 0 00-7.78 0L12 4.67l-1.06-1.06a5.501 5.501 0 00-7.78 7.78l1.06 1.06L12 20.23l7.78-7.78 1.06-1.06a5.501 5.501 0 000-7.78v0z"
        fill="#FC4747"
        stroke="#FB1E20"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={7} cy={7} r={3} fill="#FF7977" />
    </Svg>
  );
};

export default Heart;
