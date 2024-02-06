import {
  Blur,
  Canvas,
  Fill,
  Group,
  Path,
  fitbox,
  rect,
  center,
  mix,
} from "@shopify/react-native-skia";
import React, { useEffect, useRef } from "react";
import { Dimensions } from "react-native";
import { Easing, useDerivedValue, withTiming } from "react-native-reanimated";

import { Beat, heart } from "./Beat";
import { useLoop, useSharedValues } from "./Animations";

const { width, height } = Dimensions.get("window");
const c = { x: width / 2, y: height / 2 };
const src = heart.computeTightBounds();
const pad = 64;
const dst1 = rect(pad, pad, width - 2 * pad, height - pad * 2);

const bpm = 44;
const duration = (60 * 1000) / bpm;
const valueCount = 3;
const beatEasing = (x: number): number => {
  "worklet";
  const c4 = (2 * Math.PI) / 3;
  if (x === 0) {
    return 0;
  }
  if (x === 1) {
    return 1;
  }
  return -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
};

export const Heartrate = () => {
  const count = useRef(0);
  const values = useSharedValues(1, 1, 1);
  const progress = useLoop({ duration: duration / 2 });
  useEffect(() => {
    const it = setInterval(() => {
      const val = values[count.current];
      val.value = 0;
      val.value = withTiming(1, {
        duration: duration * 3,
        easing: Easing.linear,
      });
      count.current = (count.current + 1) % valueCount;
    }, duration);
    return () => {
      clearInterval(it);
    };
  }, [values]);
  const transform = useDerivedValue(() => [
    { scale: mix(beatEasing(1 - progress.value), 1.1, 1) },
  ]);
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color="black" />
      {values.map((val, i) => (
        <Beat key={i} progress={val} />
      ))}
      <Group transform={transform} origin={c}>
        <Group transform={fitbox("contain", src, dst1)}>
          <Path color="#D52327" path={heart} />
          <Group>
            <Path
              color="#3f0a0b"
              path={heart}
              transform={[{ scale: 0.9 }]}
              origin={center(src)}
            >
              <Blur blur={8} />
            </Path>
          </Group>
        </Group>
      </Group>
    </Canvas>
  );
};
