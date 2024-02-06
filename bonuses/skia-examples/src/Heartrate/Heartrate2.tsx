import React from "react";
import { Canvas, Fill, Group, Shader, Skia } from "@shopify/react-native-skia";
import { Dimensions } from "react-native";

import { frag } from "../components";

const { width, height } = Dimensions.get("window");
const origin = { x: width / 2, y: height / 2 };
const c1 = Skia.Color("#3f0a0b");
const c2 = Skia.Color("#D52327");

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
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color="black" />
      <Group transform={[{ scale: 2 }]} origin={origin}>
        <Fill>
          <Shader
            source={source}
            uniforms={{ resolution: [width, height], c1, c2 }}
          />
        </Fill>
      </Group>
      <Fill>
        <Shader
          source={source}
          uniforms={{ resolution: [width, height], c1, c2 }}
        />
      </Fill>
    </Canvas>
  );
};
