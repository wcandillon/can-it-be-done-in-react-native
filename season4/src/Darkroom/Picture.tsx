import React, { useMemo } from "react";
import { Dimensions, Image } from "react-native";
import { Surface } from "gl-react-expo";
import { Node, Shaders, GLSL } from "gl-react";

const { width } = Dimensions.get("window");

const shaders = Shaders.create({
  picture: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D source;

void main() {
  gl_FragColor=texture2D(source, uv);
}`,
  },
});

interface PictureProps {
  source: ReturnType<typeof require>;
}

const Picture = ({ source }: PictureProps) => {
  const aspectRatio = useMemo(() => {
    const dim = Image.resolveAssetSource(source);
    return dim.height / dim.width;
  }, [source]);
  return (
    <Surface style={{ width, height: width * aspectRatio }}>
      <Node shader={shaders.picture!} uniforms={{ source }} />
    </Surface>
  );
};

export default Picture;
