import type { ReactNode } from "react";
import React from "react";
import { Dimensions } from "react-native";
import { Fill, Shader } from "@shopify/react-native-skia";

import { frag } from "../components";

const source = frag`
uniform shader iImage1;
uniform shader mask;
uniform float2 iResolution;

vec3 draw(vec2 uv) {
  return iImage1.eval(vec2(uv.x,uv.y) * iResolution).rgb;   
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
  vec3 blurred_image = vec3(0.);
  for (float i = 0.; i < repeats; i++) {
    vec2 q = vec2(
      cos(degrees((i / repeats) * 360.)),
      sin(degrees((i / repeats) * 360.))) * (rand(vec2(i, uv.x + uv.y)) + bluramount);
    vec2 uv2 = uv + (q * bluramount);
    blurred_image += draw(uv2) / 2.;
    //One more to hide the noise.
    q = vec2(cos(degrees((i / repeats) * 360.)), sin(degrees((i / repeats) * 360.))) *
      (rand(vec2(i + 2., uv.x + uv.y + 24.)) + bluramount);
    uv2 = uv + (q * bluramount);
    blurred_image += draw(uv2) / 2.;
  }
  blurred_image /= repeats;
  return vec4(blurred_image, 1.0);
}
`;

const { width, height } = Dimensions.get("window");

interface BlurGradientProps {
  children: ReactNode | ReactNode[];
  mask: ReactNode;
}

export const BlurGradient = ({ children, mask }: BlurGradientProps) => {
  return (
    <Fill>
      <Shader
        source={source}
        uniforms={{
          iResolution: [width, height],
        }}
      >
        {children}
        {mask}
      </Shader>
    </Fill>
  );
};
