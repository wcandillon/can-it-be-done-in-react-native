import type { ReactNode } from "react";
import { Dimensions } from "react-native";
import { Fill, Shader, vec } from "@shopify/react-native-skia";

import { frag } from "../../components";

interface Kernel {
  n: number;
  offsets: number[];
  weights: number[];
}

export const generareBlurMask = (
  radius: number,
  maxSigma: number,
  aSteps?: number
) => {
  const steps = aSteps ?? Math.round(maxSigma / 10);
  const kernels = new Array(steps)
    .fill(0)
    .map((_, i) => generateKernel(radius, (maxSigma * (i + 1)) / steps));
  const shader = generateShader(kernels);
  const uniforms: Record<string, number[]> = {};
  kernels.forEach((kernel, i) => {
    uniforms[`WEIGHTS${i}`] = kernel.weights;
    uniforms[`OFFSETS${i}`] = kernel.offsets;
  });
  return {
    shader,
    uniforms,
  };
};

const generateShader = (kernels: Kernel[]) => {
  const [{ n }] = kernels;
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

vec2 interpolate(float amount, int n, vec2 values[]) {
    // Ensure there are at least two values to interpolate between
    if (n < 2) return vec2(0.0, 0.0);

    // Calculate the size of each interpolation step
    float stepSize = 1.0 / float(n - 1);

    // Find the current step based on the amount
    int step = int(amount / stepSize);

    // Clamp the step to be within the array bounds
    step = clamp(step, 0, n - 2);

    // Calculate the local interpolation amount
    float localAmount = (amount - float(step) * stepSize) / stepSize;

    // Perform the interpolation
    return mix(values[step], values[step + 1], localAmount);
}

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
        vec2 offset = blurDirection * interpolate(amount, OFFSETS1[i], OFFSETS2[i], OFFSETS3[i], OFFSETS4[i]);
        float weight = interpolate(amount, WEIGHTS1[i], WEIGHTS2[i], WEIGHTS3[i], WEIGHTS4[i]);
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

const generateKernel = (radius: number, sigma: number) => {
  const linear = true;
  const correction = false;

  // if (sigma === 0.0) {
  //   return;
  // }

  const weights = [];
  let sumWeights = 0.0;
  for (let i = -radius; i <= radius; i++) {
    let w = 0;
    if (correction) {
      w =
        (erf((i + 0.5) / sigma / Math.sqrt(2)) -
          erf((i - 0.5) / sigma / Math.sqrt(2))) /
        2;
    } else {
      w = Math.exp((-i * i) / sigma / sigma);
    }
    sumWeights += w;
    weights.push(w);
  }

  for (const i in weights) {
    weights[i] /= sumWeights;
  }

  const offsets = [];
  let newWeights = [];

  let hasZeros = false;

  if (linear) {
    for (let i = -radius; i <= radius; i += 2) {
      if (i === radius) {
        offsets.push(i);
        newWeights.push(weights[i + radius]);
      } else {
        const w0 = weights[i + radius + 0];
        const w1 = weights[i + radius + 1];

        const w = w0 + w1;
        if (w > 0) {
          offsets.push(i + w1 / w);
        } else {
          hasZeros = true;
          offsets.push(i);
        }
        newWeights.push(w);
      }
    }
  } else {
    for (let i = -radius; i <= radius; i++) {
      offsets.push(i);
    }

    for (const w of weights) {
      if (w === 0.0) {
        hasZeros = true;
      }
    }

    newWeights = weights;
  }

  if (hasZeros) {
    console.warn(
      "Some weights are equal to zero; try using a smaller radius or a bigger sigma"
    );
  }

  return {
    n: newWeights.length,
    offsets,
    weights: newWeights,
  };
};

interface BlurGradientProps {
  mask: ReactNode | ReactNode[];
  children: ReactNode | ReactNode[];
  sigma?: number;
  radius?: number;
}

export const BlurMask = ({
  mask,
  children,
  sigma = 15,
  radius = 30,
}: BlurGradientProps) => {
  const { shader: source, uniforms } = generareBlurMask(radius, sigma);
  return (
    <Fill>
      <Shader
        source={source}
        uniforms={{
          direction: vec(1, 0),
          ...uniforms,
        }}
      >
        <Shader
          source={source}
          uniforms={{
            direction: vec(0, 1),
            ...uniforms,
          }}
        >
          {children}
          {mask}
        </Shader>
        {mask}
      </Shader>
    </Fill>
  );
};
