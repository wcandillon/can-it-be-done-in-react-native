import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
// @ts-ignore
import { Surface } from "gl-react-expo";
// @ts-ignore
import { GLSL, Node, Shaders } from "gl-react";
// @ts-ignore
import { Blur } from "gl-react-blur";
import Color from "color";

const { width, height } = Dimensions.get("window");
const SIZE = height;
const DELTA = (height - width) / 2;

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
varying vec2 uv;

void main() {
  float mag = distance(uv, position);
  gl_FragColor = mag > progress ? vec4(backgroundColorStart, 1.0) : vec4(foregroundColorStart, 1.0);
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
  const progress = useRef(0);
  useEffect(() => {
    progress.current = 0;
    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorSelection]);
  const uniforms = {
    backgroundColorStart: vec3(colorSelection.previous.start),
    foregroundColorStart: vec3(colorSelection.current.start),
    position: [(DELTA + position.x) / SIZE, 1 - position.y / SIZE],
    progress: 0,
  };
  const animate = () => {
    if (progress.current < 1) {
      progress.current += 0.05;
      node.current?.setDrawProps({
        uniforms: {
          ...uniforms,
          progress: progress.current,
        },
      });
      requestAnimationFrame(animate);
    }
  };
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
