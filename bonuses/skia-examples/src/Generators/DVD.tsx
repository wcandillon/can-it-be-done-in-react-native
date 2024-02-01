/* eslint-disable max-len */
import {
  Canvas,
  Fill,
  Group,
  Path,
  Skia,
  clamp,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import { useDerivedValue } from "react-native-reanimated";

import {
  makeAnimation,
  timeSincePreviousFrame,
  useAnimation,
} from "./Animations";

const colors = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ff00ff",
  "#ffff00",
  "#00ffff",
];

const { width, height } = Dimensions.get("window");
const velocity = 150 / 1000;
export const LOGO_WIDTH = 187.09;
export const LOGO_HEIGHT = 82.68;
const rightBound = width - LOGO_WIDTH;
const bottomBound = height - LOGO_HEIGHT;
const p1 = Skia.Path.MakeFromSVGString(
  "M 129 10 H 147 S 169 9 168 20 C 168 38 141 37 141 37 L 146 14 H 128 L 120 47 H 138 S 156 48 171 40 C 187 33 187 19 187 19 A 15 15 0 0 0 179 6 C 170 0 158 0 158 0 H 118 L 95 31 L 85 0 H 16 L 14 10 H 32 S 54 9 53 20 C 52 38 26 37 26 37 L 31 14 H 13 L 5 47 H 23 S 41 48 56 40 C 72 33 72 19 72 19 A 35 35 0 0 0 71 14 C 71 12 70 10 70 10 H 71 L 88 57 L 129 10 Z M 88 57 C 40 57 0 63 0 70 S 40 83 88 83 S 177 77 177 70 S 137 57 88 57 Z M 46 77 H 42 L 34 64 H 39 L 44 72 L 48 64 H 53 Z M 67 77 H 62 V 64 H 67 Z M 84 77 H 77 V 64 H 84 C 89 64 93 67 93 70 S 89 77 84 77 Z M 113 67 H 107 V 69 H 112 V 72 H 107 V 74 H 113 V 77 H 102 V 64 H 113 Z M 132 77 C 126 77 122 74 122 70 C 122 66 127 63 132 63 S 142 66 142 70 C 142 74 138 77 132 77 Z"
)!;
const p2 = Skia.Path.MakeFromSVGString(
  "M 132 67 C 135 67 137 69 137 70 C 137 72 135 74 132 74 S 127 72 127 70 C 127 68 129 67 132 67 Z M 83 67 H 82 V 74 H 83 C 86 74 88 73 88 70 C 88 68 86 66 83 66 Z"
)!;

const bounce = (
  value: SharedValue<number>,
  color: SharedValue<string>,
  delta: number,
  direction: number,
  bounds: [number, number]
) => {
  "worklet";
  value.value = clamp(
    value.value + velocity * delta * direction,
    bounds[0],
    bounds[1]
  );
  if (value.value === bounds[0] || value.value === bounds[1]) {
    direction *= -1;
    color.value = colors.filter((c) => c !== color.value)[
      Math.floor(Math.random() * (colors.length - 1))
    ];
  }
  return direction;
};

const animation = makeAnimation(
  function* ({ x, y, color }) {
    "worklet";
    const direction = { x: 1, y: 1 };
    while (true) {
      const delta = yield* timeSincePreviousFrame();
      direction.x = bounce(x, color, delta, direction.x, [0, rightBound]);
      direction.y = bounce(y, color, delta, direction.y, [0, bottomBound]);
    }
  },
  {
    x: 0,
    y: 0,
    color: colors[0],
  }
);

export const Generators = () => {
  const { x, y, color } = useAnimation(animation);
  const transform = useDerivedValue(() => [
    { translateX: x.value },
    { translateY: y.value },
  ]);
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color="black" />
      <Group transform={transform}>
        <Path path={p1} color={color} />
        <Path path={p2} color={color} />
      </Group>
    </Canvas>
  );
};
