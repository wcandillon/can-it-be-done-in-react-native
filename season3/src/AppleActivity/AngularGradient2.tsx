import React from "react";
import { Surface } from "gl-react-expo";
import { GLSL, Node, Shaders } from "gl-react";

import { SIZE } from "./Constants";

const shaders = Shaders.create({
  helloGL: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
void main() {
  gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0);
}
`
  }
});

export default () => (
  <Surface style={{ width: SIZE, height: SIZE }}>
    <Node shader={shaders.helloGL} />
  </Surface>
);
