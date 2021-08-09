import { Transforms2d, Vector } from "react-native-redash";

export const transformOrigin = (
  { x, y }: Vector,
  transformations: Transforms2d
): Transforms2d => {
  "worklet";
  return [
    { translateX: x },
    { translateY: y },
    ...transformations,
    { translateX: -x },
    { translateY: -y },
  ];
};
