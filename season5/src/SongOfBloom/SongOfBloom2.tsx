import {
  Canvas,
  Fill,
  Turbulence,
  useClockValue,
  useTouchHandler,
  useValue,
  vec,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";

import { cols, rows, Symbol } from "./Symbol";

const { width, height } = Dimensions.get("window");
const c = vec(width / 2, height / 2);

export const SongOfBloom = () => {
  const clock = useClockValue();
  const pos = useValue(c);
  const onTouch = useTouchHandler({
    onActive: (e) => {
      pos.current = e;
    },
  });
  return (
    <Canvas style={{ flex: 1 }} onTouch={onTouch}>
      <Fill color="black" />
      {new Array(rows)
        .fill(0)
        .map((_i, i) =>
          new Array(cols)
            .fill(0)
            .map((_j, j) => (
              <Symbol key={`${i}-${j}`} i={i} j={j} clock={clock} pos={pos} />
            ))
        )}
      <Fill blendMode="overlay">
        <Turbulence freqX={0.25} freqY={0.25} octaves={2} />
      </Fill>
    </Canvas>
  );
};
