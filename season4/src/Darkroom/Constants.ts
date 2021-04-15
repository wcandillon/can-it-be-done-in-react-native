import { Dimensions } from "react-native";
import { Path, Vector } from "react-native-redash";

const { width } = Dimensions.get("window");
export const PADDING = 24;
export const HEIGHT = 200;
export const WIDTH = width - PADDING * 2;
export const STROKE = 2;

export const MATH = `
float asinh(float x) {
  return log(x+sqrt(x*x+1.0));
}

float acosh(float x) {
  return log(x+sqrt(x*x-1.0));
}

float cosh(float x) {
  return 0.5 * (exp(x)+exp(-x));
}

float sinh(float x) {
  return 0.5 * (exp(x)-exp(-x));
}

vec4 solveCubic(in float a, in float b, in float c, in float d) {
  float aa = a * a, bb = b * b;

  float denom = 3.0 * aa;
  float inflect = b / (3.0 * a);

  float p = c / a - bb / denom;
  float q = bb * b / (13.5 * aa * a) - b * c / denom + d / a;
  float ppp = p * p * p, qq = q * q;

  float p2 = abs(p);
  float v1 = 1.5 / p * q;

  vec4 roots = vec4(0.0, 0.0, 0.0, 1.0);
  if (qq * 0.25 + ppp / 27.0 > 0.0) {
      float v2 = v1 * sqrt(3.0 / p2);
      if (p < 0.0) roots[0] = sign(q) * cosh(acosh(v2 * -sign(q)) / 3.0);
      else roots[0] = sinh(asinh(v2) / 3.0);
      roots[0] = -2.0 * sqrt(p2 / 3.0) * roots[0] - inflect;
  }

  else {
      float ac = acos(v1 * sqrt(-3.0 / p)) / 3.0; // 0π/3,       2π/3,               4π/3
      roots = vec4(2.0 * sqrt(-p / 3.0) * cos(vec3(ac, ac - 2.09439510239, ac - 4.18879020479)) - inflect, 3.0);
  }

  return roots;
}

float cubicBezier (
  float t,
  float from,
  float c1,
  float c2,
  float to
) {
  float term = 1.0 - t;
  float a = 1.0 * pow(term, 3.0) * pow(t, 0.0) * from;
  float b = 3.0 * pow(term, 2.0) * pow(t, 1.0) * c1;
  float c = 3.0 * pow(term, 1.0) * pow(t, 2.0) * c2;
  float d = 1.0 * pow(term, 0.0) * pow(t, 3.0) * to;
  return a + b + c + d;
}

float cubicBezierYForX(float x, vec2 a, vec2 b, vec2 c, vec2 d) {
  float pa = -a.x + 3.0 * b.x - 3.0 * c.x + d.x;
  float pb = 3.0 * a.x - 6.0 * b.x + 3.0 * c.x;
  float pc = -3.0 * a.x + 3.0 * b.x;
  float pd = a.x - x;
  vec4 roots = solveCubic(pa, pb, pc, pd);
  float t = roots[0];
  return cubicBezier(t, a.y, b.y, c.y, d.y);
}`;

const shaderVec = (v: Vector) => [v.x / WIDTH, 1 - v.y / HEIGHT];

export const shaderPath = (p: Path) => ({
  c1: [
    shaderVec(p.move),
    shaderVec(p.curves[0]!.c1),
    shaderVec(p.curves[0]!.c2),
    shaderVec(p.curves[0]!.to),
  ],
  c2: [
    shaderVec(p.curves[0]!.to),
    shaderVec(p.curves[1]!.c1),
    shaderVec(p.curves[1]!.c2),
    shaderVec(p.curves[1]!.to),
  ],
  c3: [
    shaderVec(p.curves[1]!.to),
    shaderVec(p.curves[2]!.c1),
    shaderVec(p.curves[2]!.c2),
    shaderVec(p.curves[2]!.to),
  ],
  c4: [
    shaderVec(p.curves[2]!.to),
    shaderVec(p.curves[3]!.c1),
    shaderVec(p.curves[3]!.c2),
    shaderVec(p.curves[3]!.to),
  ],
});
