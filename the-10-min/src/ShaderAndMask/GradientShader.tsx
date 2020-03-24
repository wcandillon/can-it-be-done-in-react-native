/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from "react";
// @ts-ignore
import { Surface } from "gl-react-expo";
// @ts-ignore
import { GLSL, Node, Shaders } from "gl-react";
import Color from "color";

import { Ring } from "./Constants";

const shaders = Shaders.create({
  helloGL: {
    frag: GLSL`
#define PI  3.141592653589793
#define TAU 6.283185307179586

precision highp float;
varying vec2 uv;
uniform vec3 start, end;
uniform float size;

void main() {
  float pct = distance(uv, vec2(0.5));
  vec2 pos = vec2(0.5) - uv;
  float a = atan(pos.y, pos.x);
  float progress = a * 0.5 / PI + 0.5;
  vec3 color = mix(end, start, progress);
  gl_FragColor = pct > size ? vec4(0.0) : vec4(color, 1.0);
}
`,
  },
});

interface AngularGradientProps {
  ring: Ring;
}

export default ({ ring }: AngularGradientProps) => (
  <Surface
    style={{
      width: ring.size,
      height: ring.size,
    }}
  >
    <Node
      shader={shaders.helloGL}
      uniforms={{
        start: new Color(ring.start)
          .rgb()
          .array()
          .map((c) => c / 255),
        end: new Color(ring.end)
          .rgb()
          .array()
          .map((c) => c / 255),
        size: 0.5,
      }}
    />
  </Surface>
);
