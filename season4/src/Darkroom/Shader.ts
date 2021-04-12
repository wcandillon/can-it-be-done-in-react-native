export const Shaders = {
  asinh: {
    source: `
float asinh(float x) {
  return log(x+sqrt(x*x+1.0));
}`,
    deps: [],
  },
    asinh: {
    source: `
    float acosh(float x) {
      return log(x+sqrt(x*x-1.0));
    },
    deps: [],
  },
};
