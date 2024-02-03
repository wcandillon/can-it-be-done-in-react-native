import {
  Blur,
  BlurMask,
  Canvas,
  Fill,
  Group,
  Path,
  Skia,
  fitbox,
  rect,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";

const path = Skia.Path.MakeFromSVGString(
  "M 8 15 C -7.3 4.9 3.3 -3 7.8 1.1 C 7.9 1.2 7.9 1.3 8 1.3 A 3.1 3.1 0 0 1 8.2 1.1 C 12.7 -3 23.3 4.9 8 15 Z"
)!;
const { width, height } = Dimensions.get("window");
const center = { x: width / 2, y: height / 2 };
const src = path.computeTightBounds();
const pad = 64;
const dst1 = rect(pad, pad, width - 2 * pad, height - pad * 2);

const pad2 = 100;
const dst2 = rect(pad2, pad2, width - 2 * pad2, height - pad2 * 2);

export const Heartrate = () => {
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color="black" />
      <Group transform={[{ scale: 1.4 }]} origin={center}>
        <Group transform={fitbox("contain", src, dst1)}>
          <Path color="#D52327" path={path} style="stroke" strokeWidth={1}>
            <Blur blur={1} />
          </Path>
        </Group>
      </Group>
      <Group transform={fitbox("contain", src, dst1)}>
        <Path color="#D52327" path={path} />
      </Group>
      <Group transform={fitbox("contain", src, dst2)}>
        <Path color="black" path={path}>
          <Blur blur={4} />
        </Path>
      </Group>
    </Canvas>
  );
};
