import {
  Canvas,
  useImage,
  ImageShader,
  Fill,
  Shader,
  LinearGradient,
  vec,
  Blur,
  Image,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

import { frag } from "../components/ShaderLib";

// https://www.shadertoy.com/view/4tSyzy
// TODO: clean shader
const { width, height } = Dimensions.get("window");
const source = frag`
uniform shader iImage1;
uniform shader mask;
uniform float2 iResolution;

const float pi = atan(1.0) * 4.0;
const int samples = 20;
const float sigma = float(samples) * 1 * 0.25;

float pow2(float x) {
 return x * x;
}

float gaussian(vec2 i, float sigma) {
    return 1.0 / (2.0 * pi * pow2(sigma)) * exp(-((pow2(i.x) + pow2(i.y)) / (2.0 * pow2(sigma))));
}

vec4 tex(vec2 uv) {
  return iImage1.eval(uv * iResolution.xy );
}

vec3 blur(vec2 uv, vec2 scale) {
  vec3 col = vec3(0.0);
  float accum = 0.0;
  float weight;
  vec2 offset;
  // TODO: use tex?
  float s = mix(0, sigma, mask.eval(uv * iResolution.xy).a);

  if (s > 0.0) {
    for (int x = -samples / 2; x < samples / 2; ++x) {
        for (int y = -samples / 2; y < samples / 2; ++y) {
            offset = vec2(x, y);
            if (s > 0.0) {
              weight = gaussian(offset, s);
              col += tex(uv + scale * offset).rgb * weight;
              accum += weight;
            }
        }
    }
    
    return col / accum;
  }
  return tex(uv).rgb;
}

vec4 main(vec2 coord) {
    vec4 color = vec4(0.0);
    vec2 ps = vec2(1.0) / iResolution.xy;
    vec2 uv = coord * ps;
    color.rgb = blur(uv, ps);
    color.a = 1.0;
    return color;
}
`;

export const BlurGradient = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const image = useImage(require("./zurich.jpg"));
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollY.value = -y;
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <Canvas style={{ flex: 1 }}>
        <Fill color="#765a63" />
        <Fill>
          <Shader source={source} uniforms={{ iResolution: [width, height] }}>
            <ImageShader
              image={image}
              x={0}
              y={scrollY}
              width={width}
              height={height}
              fit="cover"
            />
            <LinearGradient
              start={vec(0, 0)}
              end={vec(0, height)}
              colors={["transparent", "transparent", "black"]}
            />
          </Shader>
        </Fill>
      </Canvas>
      <View style={StyleSheet.absoluteFill}>
        <Animated.ScrollView scrollEventThrottle={16} onScroll={onScroll} />
      </View>
    </View>
  );
};
