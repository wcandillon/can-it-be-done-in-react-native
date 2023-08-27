import {
  Canvas,
  useImage,
  ImageShader,
  Fill,
  Shader,
  LinearGradient,
  vec,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { frag } from "../components/ShaderLib";

import { Title } from "./Title";

// https://www.shadertoy.com/view/4lXXWn
// TODO: clean shader
const { width, height } = Dimensions.get("window");
const source = frag`
uniform shader iImage1;
uniform shader mask;
uniform float2 iResolution;

vec3 draw(vec2 uv) {
  return iImage1.eval(vec2(uv.x,uv.y) * iResolution).rgb;   
  //return texture(iChannel0,uv).rgb;  
}

float grid(float var, float size) {
  return floor(var*size)/size;
}

float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

const float repeats = 60;
vec4 main(vec2 fragCoord)
{
  vec2 uv = (fragCoord / iResolution);
  float bluramount = mix(0, 0.1, mask.eval(fragCoord).a);
  //float dists = 5.;
  vec3 blurred_image = vec3(0.);
  for (float i = 0.; i < repeats; i++) { 
      //Older:
      //vec2 q = vec2(cos(degrees((grid(i,dists)/repeats)*360.)),sin(degrees((grid(i,dists)/repeats)*360.))) * (1./(1.+mod(i,dists)));
      vec2 q = vec2(cos(degrees((i/repeats)*360.)),sin(degrees((i/repeats)*360.))) *  (rand(vec2(i,uv.x+uv.y))+bluramount); 
      vec2 uv2 = uv+(q*bluramount);
      blurred_image += draw(uv2)/2.;
      //One more to hide the noise.
      q = vec2(cos(degrees((i/repeats)*360.)),sin(degrees((i/repeats)*360.))) *  (rand(vec2(i+2.,uv.x+uv.y+24.))+bluramount); 
      uv2 = uv+(q*bluramount);
      blurred_image += draw(uv2)/2.;
  }
  blurred_image /= repeats;
  return vec4(blurred_image,1.0);
}
`;

export const BlurGradient = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const image = useImage(require("./zurich3.jpg"));
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
          <Shader
            source={source}
            uniforms={{
              iResolution: [width, height],
            }}
          >
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
        <Title />
      </Canvas>
      <View style={StyleSheet.absoluteFill}>
        <Animated.ScrollView scrollEventThrottle={16} onScroll={onScroll} />
      </View>
    </View>
  );
};
