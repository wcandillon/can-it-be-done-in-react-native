import type { ReactNode } from "react";
import { Fill, Shader, vec } from "@shopify/react-native-skia";

import { generateShader } from "./Shader";
import { generateKernel } from "./Kernel";

export const generareBlurMask = (
  radius: number,
  maxSigma: number,
  aSteps?: number
) => {
  const steps = aSteps ?? Math.round(maxSigma / 10);
  const kernels = new Array(steps)
    .fill(0)
    .map((_, i) => generateKernel(radius, (maxSigma * (i + 1)) / steps));
  kernels.unshift(generateKernel(radius, 2));
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

interface BlurGradientProps {
  mask: ReactNode | ReactNode[];
  children: ReactNode | ReactNode[];
  sigma?: number;
  radius?: number;
}

export const BlurMask = ({
  mask,
  children,
  sigma = 30,
  radius = 16,
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
