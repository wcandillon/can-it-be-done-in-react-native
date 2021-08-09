export const TAU = Math.PI * 2;

export const normalize = (value: number) => {
  "worklet";
  const rest = value % TAU;
  return rest > 0 ? rest : TAU + rest;
};

export const denormalize = (value: number) => {
  "worklet";
  return value > Math.PI ? value - TAU : value;
};
