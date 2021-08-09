export const { PI } = Math;
export const TAU = PI * 2;

export const normalize = (value: number) => {
  "worklet";
  const rest = value % TAU;
  return rest > 0 ? rest : TAU + rest;
};

export const approximates = (
  value: number,
  target: number,
  epsilon = 0.001
) => {
  "worklet";
  return Math.abs(value - target) < epsilon;
};
