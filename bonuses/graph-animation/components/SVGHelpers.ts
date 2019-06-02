import Animated from "react-native-reanimated";
import parseSVG from "parse-svg-path";
import absSVG from "abs-svg-path";
import normalizeSVG from "normalize-svg-path";

const { Value, sub, pow, multiply, add } = Animated;

export const bezier = (
  t: Animated.Value<number>,
  p0: number,
  p1: number,
  p2: number,
  p3: number
): Animated.Node<number> => {
  const term = sub(1, t);
  const a1 = multiply(1, pow(term, 3), pow(t, 0), p0);
  const a2 = multiply(3, pow(term, 2), pow(t, 1), p1);
  const a3 = multiply(3, pow(term, 1), pow(t, 2), p2);
  const a4 = multiply(1, pow(term, 0), pow(t, 3), p3);
  return add(a1, a2, a3, a4);
};

export const getParts = (d: string) => {
  const path = normalizeSVG(absSVG(parseSVG(d)));
  return path;
};

export const getY = (
  d: string,
  x: Animated.Value<number>
): Animated.Node<number> => {
  const parts = getParts(d);
  console.log({ parts });
  return new Value(0);
};
