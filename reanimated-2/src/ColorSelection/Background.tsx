import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
// @ts-ignore
import { Surface } from "gl-react-expo";
// @ts-ignore
import { GLSL, Node, Shaders } from "gl-react";
import Color from "color";

const { width, height } = Dimensions.get("window");
const SIZE = height;
const delta = (height - width) / 2;

const vec3 = (color: string): [number, number, number] => {
  const co = Color(color);
  return [co.red() / 255, co.green() / 255, co.blue() / 255];
};

const shaders = Shaders.create({
  background: {
    frag: GLSL`
precision highp float;
uniform vec3 backgroundColorStart;
uniform vec3 foregroundColorStart;
uniform vec2 position;
uniform float progress;
uniform float radius;
varying vec2 uv;

void main() {
  float mag = distance(uv, position);
  gl_FragColor = mag > (radius * progress) ? vec4(backgroundColorStart, 1.0) : vec4(foregroundColorStart, 1.0);
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
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(0);
  }, [colorSelection]);
  const animate = () => {
    if (progress !== 1) {
      setProgress((p) => p + 0.01);
    }
  };
  if (progress < 1) {
    requestAnimationFrame(animate);
  }
  return (
    <Surface
      style={[
        StyleSheet.absoluteFill,
        { left: -delta, width: SIZE, height: SIZE },
      ]}
    >
      <Node
        shader={shaders.background}
        uniforms={{
          backgroundColorStart: vec3(colorSelection.previous.start),
          foregroundColorStart: vec3(colorSelection.current.start),
          position: [(delta + position.x) / height, position.y / height],
          radius: 1,
          progress,
        }}
      />
    </Surface>
  );
};

export default Background;
