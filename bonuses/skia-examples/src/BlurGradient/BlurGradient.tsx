import {
  Canvas,
  useImage,
  Image,
  Skia,
  BackdropFilter,
  RuntimeShader,
  ImageShader,
  Fill,
  Shader,
  LinearGradient,
  vec,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { frag } from "../components/ShaderLib";

const { width, height } = Dimensions.get("window");
const source = frag`
uniform shader image;
uniform shader mask;
uniform float2 resolution;

half4 main(float2 xy) {
  // From: https://www.shadertoy.com/view/Xltfzj
  const float Pi = 6.28318530718; // Pi*2
  const float Directions = 16.0; // BLUR DIRECTIONS (Default 16.0 - More is better but slower)
  const float Quality = 3.0; // BLUR QUALITY (Default 4.0 - More is better but slower)
  const float Size = 30; // BLUR SIZE (Radius)
  vec2 Radius = mix(0, Size, mask.eval(xy).a)/resolution.xy;

  // Normalized pixel coordinates (from 0 to 1)
  vec2 uv = xy/resolution;
  // Pixel colour
  vec4 Color = image.eval(uv * resolution);
  // Blur calculations
  for( float d=0.0; d<Pi; d+=Pi/Directions)
  {
      for(float i=1.0/Quality; i<=1.001; i+=1.0/Quality)
      {
        float2 val = uv+vec2(cos(d),sin(d))*Radius*i;
        Color += image.eval(val * resolution);		
      }
  }
  // Output to screen
  Color /= Quality * Directions + 1.0;
  return Color;
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
        <Fill>
          <Shader source={source} uniforms={{ resolution: [width, height] }}>
            <ImageShader
              image={image}
              x={0}
              y={scrollY}
              width={width}
              height={height}
              fit="cover"
            />
            <LinearGradient
              start={vec(0, height / 2)}
              end={vec(0, height)}
              colors={["transparent", "black"]}
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
