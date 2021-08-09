import { Matrix3, processTransform2d, Transforms2d } from "react-native-redash";

const toSVG = (m: Matrix3) => {
  "worklet";
  return [m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]];
};

export const transformSvg = (transform: Transforms2d) => {
  "worklet";
  return toSVG(processTransform2d(transform));
};
