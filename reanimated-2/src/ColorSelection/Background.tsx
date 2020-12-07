import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
// @ts-ignore
import { Surface } from "gl-react-expo";
// @ts-ignore
import { GLSL, Node, Shaders } from "gl-react";
import Color from "color";

const { width, height } = Dimensions.get("window");

const vec3 = (color: string): [number, number, number] => {
  const co = Color(color);
  console.log([co.red() / 255, co.green() / 255, co.blue() / 255]);
  return [co.red() / 255, co.green() / 255, co.blue() / 255];
};

const shaders = Shaders.create({
  background: {
    frag: GLSL`
#define WIDTH  ${width}
#define HEIGHT  ${height}
precision highp float;
uniform vec3 backgroundColorStart;
varying vec2 uv;

void main() {
  gl_FragColor = vec4(backgroundColorStart, 1.0);
}
`,
  },
});

type Color = {
  start: string;
  end: string;
};

interface BackgroundProps {
  colorSelection: {
    previous: Color;
    current: Color;
  };
  position: {
    x: number;
    y: number;
  };
}

const Background = ({ colorSelection, position }: BackgroundProps) => {
  return (
    <Surface style={StyleSheet.absoluteFill}>
      <Node
        shader={shaders.background}
        uniforms={{ backgroundColorStart: vec3(colorSelection.previous.start) }}
      />
    </Surface>
  );
};

export default Background;
