import React, { useCallback, useMemo, useRef } from "react";
import { Dimensions, Image } from "react-native";
import { Surface } from "gl-react-expo";
import { Node, Shaders, GLSL } from "gl-react";
import Animated, {
  runOnJS,
  useAnimatedReaction,
} from "react-native-reanimated";
import { Path } from "react-native-redash";

const { width } = Dimensions.get("window");

const shaders = Shaders.create({
  picture: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D source;

uniform float v1;
uniform float v2;
uniform float v3;
uniform float v4;
uniform float v5;

void main() {
  vec4 c = texture2D(source, uv);
  float r = mix(v1, v5, c.x);
  float g = mix(v1, v5, c.y);
  float b = mix(v1, v5, c.z);
  gl_FragColor=vec4(r, g, b, 1.0);
}`,
  },
});

interface PictureProps {
  source: ReturnType<typeof require>;
  path: Animated.DerivedValue<Path>;
  v1: Animated.SharedValue<number>;
  v2: Animated.SharedValue<number>;
  v3: Animated.SharedValue<number>;
  v4: Animated.SharedValue<number>;
  v5: Animated.SharedValue<number>;
}

const Picture = ({ source, v1, v2, v3, v4, v5 }: PictureProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const node = useRef<any>(null);
  const aspectRatio = useMemo(() => {
    const dim = Image.resolveAssetSource(source);
    return dim.height / dim.width;
  }, [source]);
  const update = useCallback(
    (val1: number, val2: number, val3: number, val4: number, val5: number) => {
      node.current.setDrawProps({
        uniforms: {
          source,
          v1: 1 - val1,
          v2: 1 - val2,
          v3: 1 - val3,
          v4: 1 - val4,
          v5: 1 - val5,
        },
      });
    },
    [source]
  );
  useAnimatedReaction(
    () => v1.value + v2.value + v3.value + v4.value + v5.value,
    () => runOnJS(update)(v1.value, v2.value, v3.value, v4.value, v5.value)
  );
  return (
    <Surface style={{ width, height: width * aspectRatio }}>
      <Node
        ref={node}
        shader={shaders.picture!}
        uniforms={{
          source,
          v1: 1 - v1.value,
          v2: 1 - v2.value,
          v3: 1 - v3.value,
          v4: 1 - v4.value,
          v5: 1 - v5.value,
        }}
      />
    </Surface>
  );
};

export default Picture;
