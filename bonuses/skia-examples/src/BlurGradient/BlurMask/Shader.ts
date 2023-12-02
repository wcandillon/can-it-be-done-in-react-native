import { frag } from "../../components";

interface Kernel {
  n: number;
  offsets: number[];
  weights: number[];
}

const generateInterpolateFunction = (size: number) => {
  if (size < 2) {
    return `float interpolate(float amount, float values[${size}]) {
  return 0.0;
}`;
  }

  let cases = "";
  for (let i = 0; i < size - 1; i++) {
    cases += `    ${
      i === 0 ? "if" : "else if"
    } (step == ${i}) return mix(values[${i}], values[${
      i + 1
    }], localAmount);\n`;
  }

  return `float interpolate(float amount, float values[${size}]) {
  float stepSize = 1.0 / float(${size - 1});
  int step = int(amount / stepSize);
  step = step < 0 ? 0 : step; // Manual clamp
  step = step > ${size - 2} ? ${size - 2} : step; // Manual clamp
  float localAmount = (amount - float(step) * stepSize) / stepSize;
${cases}
  // This should never be reached
  return 0.0;
}`;
};

export const generateShader = (kernels: Kernel[]) => {
  const [{ n }] = kernels;
  const l = kernels.length;
  const source = frag`
uniform shader image;
uniform shader mask;

uniform float2 direction;

${kernels
  .map(
    (_, i) => `
uniform float[${n}] WEIGHTS${i};
uniform float[${n}] OFFSETS${i};
`
  )
  .join("\n")}

int clampStep(int x, int minVal, int maxVal) {
  if (x < minVal) return minVal;
  if (x > maxVal) return maxVal;
  return x;
}


${generateInterpolateFunction(l)}

// blurDirection is:
//     vec2(1,0) for horizontal pass
//     vec2(0,1) for vertical pass
// The sourceTexture to be blurred MUST use linear filtering!
// pixelCoord is in [0..1]
vec4 blur(vec2 blurDirection, vec2 pixelCoord, float amount)
{
    vec4 result = vec4(0.0);
    for (int i = 0; i < ${n}; ++i)
    {
      float[${l}] offsets;
      float[${l}] weights;
      ${kernels
        .map(
          (_, i) => `
      offsets[${i}] = OFFSETS${i}[i];
      weights[${i}] = WEIGHTS${i}[i]; `
        )
        .join("\n")}
        vec2 offset = blurDirection * interpolate(amount, offsets);
        float weight = interpolate(amount, weights);
        result += image.eval((pixelCoord + offset)) * weight;
    }
    return result;
}

half4 main(vec2 fragCoord) {
  float amount = mask.eval(fragCoord).a;
  if (amount == 0.0) {
    return image.eval(fragCoord);
  }
  return blur(direction, fragCoord.xy, amount);
}
`;
  return source;
};
