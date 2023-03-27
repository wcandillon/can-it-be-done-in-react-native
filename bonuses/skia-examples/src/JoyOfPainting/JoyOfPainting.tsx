import { Canvas, rect } from "@shopify/react-native-skia";
import React from "react";

import { Grain } from "./Grain";
import { Limmat } from "./Limmat";
import { Silo } from "./Silo";
import { Sky } from "./Sky";
import { Tree } from "./Tree";

export const JoyOfPainting = () => {
  return (
    <Canvas style={{ flex: 1 }}>
      <Grain>
        <Sky />
        <Silo />
        <Limmat />
        <Tree rct={rect(125, 430, 120, 150)} />
        <Tree rct={rect(50, 420, 120, 150)} />
        <Tree rct={rect(-50, 410, 120, 170)} />
      </Grain>
    </Canvas>
  );
};
