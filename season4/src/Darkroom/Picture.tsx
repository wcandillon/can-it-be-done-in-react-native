import React, { useRef } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Surface } from "gl-react-expo";
import { Node, Shaders, GLSL, Uniform } from "gl-react";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    height: width,
    width: width,
  },
});

const shaders = Shaders.create({
  picture: {
    vert: GLSL`
attribute vec2 _p;
varying vec2 uv;
uniform float tR;
uniform vec2 res;
float r;
void main() {
  r = res.x / res.y;
  gl_Position = vec4(_p,0.0,1.0);
  uv = .5+.5*_p*vec2(max(r/tR,1.),max(tR/r,1.));
}`,
    frag: GLSL`
precision mediump float;

// our texture
uniform sampler2D source;
  
// the texCoords passed in from the vertex shader.
varying vec2 uv;
  
void main() {
    // Look up a color from the texture.
    gl_FragColor = texture2D(source, uv);
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
      <Node
        ref={node}
        shader={shaders.picture!}
        uniforms={{
          source,
          tR: Uniform.textureSizeRatio(source),
          res: Uniform.Resolution,
        }}
      />
    </Surface>
  );
};

export default Picture;
