import type { ReactNode } from "react";
import { Fill, Shader, vec } from "@shopify/react-native-skia";

import { generateShader } from "./Shader";
import { generateKernel } from "./Kernel";

const opts = {
  linear: true,
  correction: false,
  sigmaStep: 6,
  radius: 8,
  sigma: 48,
};

export const generareBlurMask = (
  radius: number,
  maxSigma: number,
  aSteps?: number
) => {
  const steps = aSteps ?? Math.round(maxSigma / opts.sigmaStep);
  const kernels = new Array(steps)
    .fill(0)
    .map((_, i) => generateKernel(radius, (maxSigma * (i + 1)) / steps, opts));
  kernels.unshift(generateKernel(radius, 1, opts));
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

const { shader: source, uniforms } = generareBlurMask(opts.radius, opts.sigma);

interface BlurGradientProps {
  mask: ReactNode | ReactNode[];
  children: ReactNode | ReactNode[];
}

export const BlurMask = ({ mask, children }: BlurGradientProps) => {
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
