import {
  Blur,
  Group,
  Path,
  Skia,
  fitbox,
  mix,
  rect,
} from "@shopify/react-native-skia";
import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const path = Skia.Path.MakeFromSVGString(
  "M 8 15 C -7.3 4.9 3.3 -3 7.8 1.1 C 7.9 1.2 7.9 1.3 8 1.3 A 3.1 3.1 0 0 1 8.2 1.1 C 12.7 -3 23.3 4.9 8 15 Z"
)!;
const { width, height } = Dimensions.get("window");
const c = { x: width / 2, y: height / 2 };
const src = path.computeTightBounds();
const pad = 64;
const dst = rect(pad, pad, width - 2 * pad, height - pad * 2);

export const Breat = () => {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withTiming(1, { duration: 3000 });
  }, [progress]);
  const transform = useDerivedValue(() => [
    { scale: mix(progress.value, 1, 8) },
  ]);
  const blur = useDerivedValue(() => mix(progress.value, 1, 4));
  return (
    <Group transform={transform} origin={c}>
      <Group transform={fitbox("contain", src, dst)}>
        <Path color="#D52327" path={path} style="stroke" strokeWidth={1}>
          <Blur blur={blur} />
        </Path>
      </Group>
    </Group>
  );
};
