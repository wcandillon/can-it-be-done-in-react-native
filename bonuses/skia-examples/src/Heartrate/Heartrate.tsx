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
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";

import { Breat } from "./Beat";

const path = Skia.Path.MakeFromSVGString(
  "M 8 15 C -7.3 4.9 3.3 -3 7.8 1.1 C 7.9 1.2 7.9 1.3 8 1.3 A 3.1 3.1 0 0 1 8.2 1.1 C 12.7 -3 23.3 4.9 8 15 Z"
)!;
const { width, height } = Dimensions.get("window");
const c = { x: width / 2, y: height / 2 };
const src = path.computeTightBounds();
const pad = 64;
const dst1 = rect(pad, pad, width - 2 * pad, height - pad * 2);

const bpm = 50;
const duration = 3000;

export const Heartrate = () => {
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color="black" />
      <Breat />
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
    </Canvas>
  );
};
