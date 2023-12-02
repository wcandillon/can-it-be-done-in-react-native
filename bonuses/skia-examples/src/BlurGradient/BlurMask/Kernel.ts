// From https://hewgill.com/picomath/javascript/erf.js.html
const erf = (x: number) => {
  // constants
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  // Save the sign of x
  let sign = 1;
  if (x < 0) {
    sign = -1;
  }
  x = Math.abs(x);

  // A&S formula 7.1.26
  const t = 1.0 / (1.0 + p * x);
  const y =
    1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
};

export const generateKernel = (radius: number, sigma: number) => {
  console.log(`generateKernel(${radius}, ${sigma})`);
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
