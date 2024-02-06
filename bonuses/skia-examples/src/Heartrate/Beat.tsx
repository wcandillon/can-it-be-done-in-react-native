/* eslint-disable max-len */
import {
  Blur,
  Group,
  Path,
  Skia,
  fitbox,
  mix,
  rect,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import { useDerivedValue } from "react-native-reanimated";

export const heart = Skia.Path.MakeFromSVGString(
  "M 32 60 C -29.2 19.6 13.2 -12 31.2 4.4 C 31.6 4.8 31.6 5.2 32 5.2 A 12.4 12.4 90 0 1 32.8 4.4 C 50.8 -12 93.2 19.6 32 60 Z"
)!;
const { width, height } = Dimensions.get("window");
const c = { x: width / 2, y: height / 2 };
const src = heart.computeTightBounds();
const pad = 64;
const dst = rect(pad, pad, width - 2 * pad, height - pad * 2);

interface BeatProps {
  progress: SharedValue<number>;
}

export const Beat = ({ progress }: BeatProps) => {
  const transform = useDerivedValue(() => [
    { scale: mix(progress.value, 1, 3) },
  ]);
  const blur = useDerivedValue(() => mix(progress.value, 1, 4));
  const strokeWidth = useDerivedValue(() => mix(progress.value, 4, 0));
  return (
    <Group transform={transform} origin={c}>
      <Group transform={fitbox("contain", src, dst)}>
        <Path
          color="#D52327"
          path={heart}
          style="stroke"
          strokeWidth={strokeWidth}
        >
          <Blur blur={blur} />
        </Path>
      </Group>
    </Group>
  );
};
