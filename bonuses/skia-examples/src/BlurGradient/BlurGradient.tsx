import type { ReactNode } from "react";
import React from "react";
import { Dimensions } from "react-native";
import { Fill, Shader } from "@shopify/react-native-skia";

import { frag } from "../components";

// https://shaders.skia.org/?id=60604463f3a8a2eb0449541c10cac16d30772b34bb76ce7058374bb02226f9c8
// https://www.shadertoy.com/view/4lXXWn
const source = frag`
uniform shader iImage1;
uniform shader mask;
uniform float2 iResolution;

vec3 draw(vec2 uv) {
  return iImage1.eval(uv * iResolution).rgb;   
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

interface BlurGradientProps {
  children: ReactNode | ReactNode[];
  mask: ReactNode;
}

const { width, height } = Dimensions.get("window");

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
