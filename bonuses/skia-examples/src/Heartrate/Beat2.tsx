import {
  Blur,
  Fill,
  Group,
  Shader,
  Skia,
  mix,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import { useDerivedValue } from "react-native-reanimated";

import { frag } from "../components";

const c1 = Skia.Color("#3f0a0b");
const c2 = Skia.Color("#D52327");

const source = frag`
uniform float2 resolution;
uniform vec4 c1;
uniform vec4 c2;
uniform float opacity;

float dot2(in vec2 v) { return dot(v,v); }
float sdHeart(in vec2 p)
{
    p.x = abs(p.x);
    if( p.y+p.x>1.0 )
        return sqrt(dot2(p-vec2(0.25,0.75))) - sqrt(2.0)/4.0;
    return sqrt(min(dot2(p-vec2(0.00,1.00)),
                    dot2(p-0.5*max(p.x+p.y,0.0)))) * sign(p.x-p.y);
}
vec4 main(vec2 xy) {
  vec2 p = (xy*2.0-resolution.xy)/-resolution.x;
  p.y += 0.5;
  float d = sdHeart(p);
  if (d < 0 && d > -0.1) {
    vec4 res = mix(c2, vec4(0.0, 0.0, 0.0, 1.0), d/-0.1);
    return mix(res, vec4(0.0, 0.0, 0.0, 1.0), 1.0-opacity);
  }
  return vec4(0.0, 0.0, 0.0, 0.0);
}
`;

const { width, height } = Dimensions.get("window");
const c = { x: width / 2, y: height / 2 };

interface BeatProps {
  progress: SharedValue<number>;
}

export const Beat = ({ progress }: BeatProps) => {
  const transform = useDerivedValue(() => [
    { scale: mix(progress.value, 1, 3) },
  ]);
  const blur = useDerivedValue(() => mix(progress.value, 3, 15));
  const uniforms = useDerivedValue(() => {
    return {
      resolution: [width, height],
      c1: Array.from(c1),
      c2: Array.from(c2),
      opacity: 1 - progress.value,
    };
  });
  return (
    <Group transform={transform} origin={c}>
      <Fill>
        <Shader source={source} uniforms={uniforms} />
        <Blur blur={blur} />
      </Fill>
    </Group>
  );
};
