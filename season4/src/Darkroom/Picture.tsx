import React, { useRef } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Surface } from "gl-react-expo";
import { Node, Shaders, GLSL } from "gl-react";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    height: width,
    width: width,
  },
});

const shaders = Shaders.create({
  picture: {
    frag: GLSL`
precision highp float;
varying vec2 uv;

void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`,
  },
});

interface PictureProps {
  source: ReturnType<typeof require>;
}

const Picture = ({ source }: PictureProps) => {
  const node = useRef<Node>(null);
  return (
    <Surface style={styles.container}>
      <Node ref={node} shader={shaders.picture!} />
    </Surface>
  );
};

export default Picture;
