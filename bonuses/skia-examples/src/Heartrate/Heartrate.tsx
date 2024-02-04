import {
  Blur,
  Canvas,
  Fill,
  Group,
  Path,
  Skia,
  fitbox,
  rect,
  center,
  mix,
  useValue,
} from "@shopify/react-native-skia";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import {
  Easing,
  makeMutable,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Beat } from "./Beat";
import { useLoop } from "./Animations";

const path = Skia.Path.MakeFromSVGString(
  "M 8 15 C -7.3 4.9 3.3 -3 7.8 1.1 C 7.9 1.2 7.9 1.3 8 1.3 A 3.1 3.1 0 0 1 8.2 1.1 C 12.7 -3 23.3 4.9 8 15 Z"
)!;
const { width, height } = Dimensions.get("window");
const c = { x: width / 2, y: height / 2 };
const src = path.computeTightBounds();
const pad = 64;
const dst1 = rect(pad, pad, width - 2 * pad, height - pad * 2);

const bpm = 50;
const duration = (60 * 1000) / bpm;

export const Heartrate = () => {
  const count = useRef(0);
  const val1 = useSharedValue(1);
  const val2 = useSharedValue(1);
  const val3 = useSharedValue(1);
  const progress = useLoop({ duration: duration / 2 });
  useEffect(() => {
    const it = setInterval(() => {
      const val = [val1, val2, val3][count.current];
      val.value = 0;
      val.value = withTiming(1, { duration: 3000, easing: Easing.linear });
      count.current = (count.current + 1) % 3;
    }, duration);
    return () => {
      clearInterval(it);
    };
  }, [val1, val2, val3]);
  const transform = useDerivedValue(() => [
    { scale: mix(progress.value, 1.1, 1) },
  ]);
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color="black" />
      <Beat progress={val1} />
      <Beat progress={val2} />
      <Beat progress={val3} />
      <Group transform={transform} origin={c}>
        <Group transform={fitbox("contain", src, dst1)}>
          <Path color="#D52327" path={path} />
          <Group>
            <Path
              color="black"
              path={path}
              transform={[{ scale: 0.9 }]}
              origin={center(src)}
            >
              <Blur blur={4} />
            </Path>
          </Group>
        </Group>
      </Group>
    </Canvas>
  );
};
