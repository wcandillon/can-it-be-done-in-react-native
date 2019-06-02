import Animated from "react-native-reanimated";
import parseSVG from "parse-svg-path";
import absSVG from "abs-svg-path";
import normalizeSVG from "normalize-svg-path";
import { find } from "react-native-redash";

const {
  Value,
  sub,
  pow,
  multiply,
  add,
  lessOrEq,
  greaterOrEq,
  and,
  cond,
  interpolate
} = Animated;

const MX = 1;
const MY = 2;
const CX1 = 1;
const CY1 = 2;
const CX2 = 3;
const CY2 = 4;
const CX = 5;
const CY = 6;

export const bezier = (
  t: Animated.Node<number>,
  p0: Animated.Node<number>,
  p1: Animated.Node<number>,
  p2: Animated.Node<number>,
  p3: Animated.Node<number>
): Animated.Node<number> => {
  const term = sub(1, t);
  const a1 = multiply(1, pow(term, 3), pow(t, 0), p0);
  const a2 = multiply(3, pow(term, 2), pow(t, 1), p1);
  const a3 = multiply(3, pow(term, 1), pow(t, 2), p2);
  const a4 = multiply(1, pow(term, 0), pow(t, 3), p3);
  return add(a1, a2, a3, a4);
};

export const getParts = (d: string) => {
  const curves = normalizeSVG(absSVG(parseSVG(d)));
  const parts = curves
    .filter((_, index) => index !== 0)
    .map((curve, index) => {
      const prevCurve = curves[index];
      const p0 =
        prevCurve[0] === "M"
          ? { x: prevCurve[MX], y: prevCurve[MY] }
          : { x: prevCurve[CX], y: prevCurve[CY] };
      const p1 = { x: curve[CX1], y: curve[CY1] };
      const p2 = { x: curve[CX2], y: curve[CY2] };
      const p3 = { x: curve[CX], y: curve[CY] };
      return {
        p0,
        p1,
        p2,
        p3
      };
    });
  return {
    search: parts,
    p0x: parts.map(part => part.p0.x),
    p0y: parts.map(part => part.p0.y),
    p1x: parts.map(part => part.p1.x),
    p1y: parts.map(part => part.p1.y),
    p2x: parts.map(part => part.p2.x),
    p2y: parts.map(part => part.p2.y),
    p3x: parts.map(part => part.p3.x),
    p3y: parts.map(part => part.p3.y)
  };
};

export const getY = (
  d: string,
  x: Animated.Value<number>
): Animated.Node<number> => {
  const parts = getParts(d);
  const notFound: Animated.Node<number> = new Value(-1);
  const index = parts.search.reduce(
    (acc, p, i) =>
      cond(and(greaterOrEq(x, p.p0.x), lessOrEq(x, p.p3.x)), i, acc),
    notFound
  );
  const p0x = find(parts.p0x, index);
  const p0y = find(parts.p0y, index);
  const p1y = find(parts.p1y, index);
  const p2y = find(parts.p2y, index);
  const p3x = find(parts.p3x, index);
  const p3y = find(parts.p3y, index);
  const t = interpolate(x, {
    inputRange: [p0x, p3x],
    outputRange: [0, 1]
  });
  return bezier(t, p0y, p1y, p2y, p3y);
};
