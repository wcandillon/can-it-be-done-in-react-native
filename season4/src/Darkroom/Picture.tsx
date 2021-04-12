import React, { useCallback, useMemo, useRef } from "react";
import { Dimensions, Image } from "react-native";
import { Surface } from "gl-react-expo";
import { Node, Shaders, GLSL } from "gl-react";
import Animated, {
  runOnJS,
  useAnimatedReaction,
} from "react-native-reanimated";
import { Path, serialize } from "react-native-redash";

import { MATH, shaderPath } from "./Constants";

const { width } = Dimensions.get("window");

const shaders = Shaders.create({
  picture: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D source;

uniform vec2 c1[4];
uniform vec2 c2[8];
uniform vec2 c3[8];
uniform vec2 c4[8];

${MATH}

float f(float x) {
  if (x <= 0.25) {
    return cubicBezierYForX(x, c1[0], c1[1], c1[2], c1[3]);
  } else if (x <= 0.5) {
    return cubicBezierYForX(x, c2[0], c2[1], c2[2], c2[3]);
  } else if (x <= 0.75) {
    return cubicBezierYForX(x, c3[0], c3[1], c3[2], c3[3]);
  } else {
    return cubicBezierYForX(x, c4[0], c4[1], c4[2], c4[3]);
  }
}

void main() {
  vec4 c = texture2D(source, uv);
  float r = f(c.x);
  float g = f(c.y);
  float b = f(c.z);
  gl_FragColor=vec4(r, g, b, 1.0);
}`,
  },
});

interface PictureProps {
  source: ReturnType<typeof require>;
  path: Animated.DerivedValue<Path>;
}

const Picture = ({ source, path }: PictureProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const node = useRef<any>(null);
  const aspectRatio = useMemo(() => {
    const dim = Image.resolveAssetSource(source);
    return dim.height / dim.width;
  }, [source]);
  const uniforms = useCallback(
    (p: Path) => ({
      source,
      ...shaderPath(p),
    }),
    [source]
  );
  const update = useCallback(
    (p: Path) => {
      node.current?.setDrawProps({
        uniforms: uniforms(p),
      });
    },
    [uniforms]
  );

  useAnimatedReaction(
    () => serialize(path.value),
    () => runOnJS(update)(path.value)
  );
  return (
    <Surface style={{ width, height: width * aspectRatio }}>
      <Node
        ref={node}
        shader={shaders.picture!}
        uniforms={uniforms(path.value)}
      />
    </Surface>
  );
};

export default Picture;
