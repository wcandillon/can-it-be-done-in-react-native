import {
  Group,
  CornerPathEffect,
  rect,
  Canvas,
  Path,
} from "@shopify/react-native-skia";
import React from "react";

import { drawBlob } from "./Tools";

export const JoyOfPainting = () => {
  const path = drawBlob(rect(0, 0, 400, 200));
  return (
    <Canvas style={{ flex: 1 }}>
      <Group transform={[{ translateY: 200 }]}>
        <Path path={path}>
          <CornerPathEffect r={100} />
        </Path>
      </Group>

      <Group transform={[{ translateY: 600 }]}>
        <Path path={path} />
      </Group>
    </Canvas>
  );
};
