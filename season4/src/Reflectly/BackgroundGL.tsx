import React, { useRef } from "react";
import { Surface } from "gl-react-expo";
import { Node, Shaders, GLSL } from "gl-react";
import { Dimensions, StyleSheet } from "react-native";
import { Blur } from "gl-react-blur";

import { color2vector, useGLProgress } from "./GLUtils";

interface BackgrounGLProps {
  colorSelection: {
    position: { x: number; y: number };
    current: { start: string; end: string };
    previous: { start: string; end: string };
  };
}

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: -(height - width) / 2,
    height: height,
    width: height,
  },
});

const shaders = Shaders.create({
  background: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform vec2 position;
uniform vec3 backgroundColorStart;
uniform vec3 backgroundColorEnd;
uniform vec3 foregroundColorStart;
uniform vec3 foregroundColorEnd;
uniform float progress;

vec4 gradient(vec3 start, vec3 end) {
  return vec4(mix(start, end, uv.y), 1.0);
}

void main() {
  float mag = distance(uv, position);
  gl_FragColor = mag < progress ? 
    gradient(foregroundColorStart, foregroundColorEnd)
  : 
    gradient(backgroundColorStart, backgroundColorEnd);
}
`,
  },
});

const BackgrounGL = ({
  colorSelection: { position, current, previous },
}: BackgrounGLProps) => {
  const node = useRef<Node>(null);
  const uniforms = {
    position: [
      ((height - width) / 2 + position.x) / height,
      1 - position.y / height,
    ],
    backgroundColorStart: color2vector(previous.start),
    backgroundColorEnd: color2vector(previous.end),
    foregroundColorStart: color2vector(current.start),
    foregroundColorEnd: color2vector(current.end),
    progress: 0,
  };
  useGLProgress(node, uniforms, [current]);
  return (
    <Surface style={styles.container}>
      <Blur factor={20} passes={6}>
        <Node ref={node} shader={shaders.background!} uniforms={uniforms} />
      </Blur>
    </Surface>
  );
};

export default BackgrounGL;
