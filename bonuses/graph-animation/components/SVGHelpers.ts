import Animated from "react-native-reanimated";
import parseSVG from "parse-svg-path";
import absSVG from "abs-svg-path";
import normalizeSVG from "normalize-svg-path";
import { find } from "react-native-redash";

import { getCubicBezierLength } from "./Bezier";

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

interface Point {
  x: number;
  y: number;
}

interface Part {
  length: number;
  p0: Point;
  p1: Point;
  p2: Point;
  p3: Point;
}

export interface Parts {
  length: number;
  search: { start: number; end: number }[];
  lengths: number[];
  start: number[];
  end: number[];
  p0x: number[];
  p0y: number[];
  p1x: number[];
  p1y: number[];
  p2x: number[];
  p2y: number[];
  p3x: number[];
  p3y: number[];
}

export const bezier = (
  t: Animated.Node<number>,
  p0: Animated.Node<number>,
  p1: Animated.Node<number>,
  p2: Animated.Node<number>,
  p3: Animated.Node<number>
): Animated.Node<number> => {
  const term = sub(1, t);
  const a = multiply(1, pow(term, 3), pow(t, 0), p0);
  const b = multiply(3, pow(term, 2), pow(t, 1), p1);
  const c = multiply(3, pow(term, 1), pow(t, 2), p2);
  const d = multiply(1, pow(term, 0), pow(t, 3), p3);
  return add(a, b, c, d);
};

export const getParts = (d: string): Parts => {
  const curves = normalizeSVG(absSVG(parseSVG(d)));
  const parts: Part[] = curves
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
      const length = getCubicBezierLength(p0, p1, p2, p3);
      return {
        p0,
        p1,
        p2,
        p3,
        length
      };
    });
  const search = parts.map((part, index) => {
    const start = parts.slice(0, index).reduce((acc, p) => acc + p.length, 0);
    const end = start + part.length;
    return {
      start,
      end
    };
  });
  return {
    search,
    length: parts.reduce((acc, part) => acc + part.length, 0),
    lengths: parts.map(part => part.length),
    start: search.map(p => p.start),
    end: search.map(p => p.end),
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

export const getYAtLength = (
  parts: Parts,
  length: Animated.Node<number>
): Animated.Node<number> => {
  const notFound: Animated.Node<number> = new Value(-1);
  const index = parts.search.reduce(
    (acc, p, i) =>
      cond(and(greaterOrEq(length, p.start), lessOrEq(length, p.end)), i, acc),
    notFound
  );
  const start = find(parts.start, index);
  const end = find(parts.end, index);
  const p0y = find(parts.p0y, index);
  const p1y = find(parts.p1y, index);
  const p2y = find(parts.p2y, index);
  const p3y = find(parts.p3y, index);
  const t = interpolate(length, {
    inputRange: [start, end],
    outputRange: [0, 1]
  });
  return bezier(t, p0y, p1y, p2y, p3y);
};

export const getXAtLength = (
  parts: Parts,
  length: Animated.Node<number>
): Animated.Node<number> => {
  const notFound: Animated.Node<number> = new Value(-1);
  const index = parts.search.reduce(
    (acc, p, i) =>
      cond(and(greaterOrEq(length, p.start), lessOrEq(length, p.end)), i, acc),
    notFound
  );
  const start = find(parts.start, index);
  const end = find(parts.end, index);
  const p0x = find(parts.p0x, index);
  const p1x = find(parts.p1x, index);
  const p2x = find(parts.p2x, index);
  const p3x = find(parts.p3x, index);
  const t = interpolate(length, {
    inputRange: [start, end],
    outputRange: [0, 1]
  });
  return bezier(t, p0x, p1x, p2x, p3x);
};
