/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useRef } from "react";
import { Dimensions } from "react-native";
// @ts-ignore
import { Surface } from "gl-react-expo";
// @ts-ignore
import { GLSL, Node, Shaders } from "gl-react";
// @ts-ignore
import { Blur } from "gl-react-blur";

import { useGLProgress, color2vector } from "./GLHelpers";

const { width, height } = Dimensions.get("window");
const SIZE = height;
const DELTA = (height - width) / 2;

const shaders = Shaders.create({
  background: {
    frag: GLSL`
precision highp float;
uniform vec3 backgroundColorStart;
uniform vec3 backgroundColorEnd;
uniform vec3 foregroundColorStart;
uniform vec3 foregroundColorEnd;
uniform vec2 position;
uniform float progress;
varying vec2 uv;

vec4 gradient(vec3 c1, vec3 c2)
{
    return mix(vec4(c2, 1.0), vec4(c1, 1.0), uv.y);
}

void main() {
  float mag = distance(uv, position);
  gl_FragColor = mag > progress ?
      gradient(backgroundColorStart, backgroundColorEnd)
    : 
      gradient(foregroundColorStart, foregroundColorEnd);
}
`,
  },
});

type ColorType = {
  start: string;
  end: string;
};

interface BackgroundProps {
  colorSelection: {
    previous: ColorType;
    current: ColorType;
  };
  position: {
    x: number;
    y: number;
  };
}

const Background = ({ colorSelection, position }: BackgroundProps) => {
  const node = useRef<Node>(null);
  const uniforms = {
    backgroundColorStart: color2vector(colorSelection.previous.start),
    backgroundColorEnd: color2vector(colorSelection.previous.end),
    foregroundColorStart: color2vector(colorSelection.current.start),
    foregroundColorEnd: color2vector(colorSelection.current.end),
    position: [(DELTA + position.x) / SIZE, 1 - position.y / SIZE],
    progress: 0,
  };
  useGLProgress(node, uniforms, [colorSelection]);
  return (
    <Surface
      style={{
        position: "absolute",
        top: 0,
        left: -DELTA,
        height,
        width: height,
      }}
    >
      <Blur factor={20} passes={6}>
        <Node ref={node} shader={shaders.background} uniforms={uniforms} />
      </Blur>
    </Surface>
  );
};

export default Background;
