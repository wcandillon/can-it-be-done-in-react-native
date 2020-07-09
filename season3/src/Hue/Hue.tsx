/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { StyleSheet, View } from "react-native";
// @ts-ignore
import { Surface } from "gl-react-expo";
// @ts-ignore
import { GLSL, Node, Shaders } from "gl-react";
import { Value } from "react-native-reanimated";
import { hsv2color } from "react-native-redash";

import Picker, { CANVAS_SIZE } from "./Picker";
import Header from "./Header";
import Footer from "./Footer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "black",
  },
  surface: {
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
  },
  hue: {
    alignSelf: "center",
  },
});

const shaders = Shaders.create({
  hue: {
    frag: GLSL`
#define PI  3.141592653589793
#define TAU 6.283185307179586

precision highp float;
varying vec2 uv;
uniform float size;

// https://stackoverflow.com/questions/15095909/from-rgb-to-hsv-in-opengl-glsl
vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

// All components are in the range [0…1], including hue.
vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float quadraticIn(float t) {
  return t * t;
}

void main() {
  float mag = distance(uv, vec2(0.5));
  vec2 pos = vec2(0.5) - uv;
  float a = atan(pos.y, pos.x);
  float progress = a * 0.5 / PI + 0.5;
  gl_FragColor = mag < 0.5 ? vec4(hsv2rgb(vec3(progress, quadraticIn(mag * 2.0), 1.0)), 1.0) : vec4(0.0, 0.0, 0.0, 1.0);
}
`,
  },
});

export default () => {
  const h = new Value(0);
  const s = new Value(0);
  const v = new Value(1);
  const backgroundColor = hsv2color(h, s, v);
  return (
    <View style={styles.container}>
      <Header {...{ h, s, v, backgroundColor }} />
      <View style={styles.hue}>
        <Surface style={styles.surface}>
          <Node shader={shaders.hue} />
        </Surface>
        <Picker {...{ h, s, backgroundColor }} />
      </View>
      <Footer />
    </View>
  );
};
