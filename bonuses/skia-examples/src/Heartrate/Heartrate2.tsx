import React, { useEffect, useRef } from "react";
import { Canvas, Fill, Shader, Skia, mix } from "@shopify/react-native-skia";
import { Dimensions } from "react-native";
import { Easing, useDerivedValue, withTiming } from "react-native-reanimated";

import { frag } from "../components";

import { useLoop, useSharedValues } from "./Animations";
import { Beat } from "./Beat2";

const { width, height } = Dimensions.get("window");
const origin = { x: width / 2, y: height / 2 };
const c1 = Skia.Color("#3f0a0b");
const c2 = Skia.Color("#D52327");
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

const source = frag`
uniform float2 resolution;
uniform vec4 c1;
uniform vec4 c2;

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
  if (d < 0) {
    vec3 col = c1.rgb;
    col *= exp(d);
    return mix(c1, c2, saturate(exp(10.0*d)));
  }
  return vec4(0.0, 0.0, 0.0, 0.0);
}
`;

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
      <Fill transform={transform} origin={origin}>
        <Shader
          source={source}
          uniforms={{ resolution: [width, height], c1, c2 }}
        />
      </Fill>
    </Canvas>
  );
};
