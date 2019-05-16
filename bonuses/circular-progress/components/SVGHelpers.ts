// Utility command factories
const point = (c: string) => function pushPoint(x: string, y: string) {
  return this.push(c, x, y);
};

const arc = (c, cc) => function pushArc(x, y, rx, ry, outer) {
  return this.push(c, Math.abs(rx || x), Math.abs(ry || rx || y), 0, outer ? 1 : 0, cc, x, y);
};

const curve = (t, s, q, c) => function pushCurve(c1x, c1y, c2x, c2y, ex, ey) {
  const l = arguments.length; const
    k = l < 4 ? t : l < 6 ? q : c;
  return this.push(k, c1x, c1y, c2x, c2y, ex, ey);
};

// SVG Path Class
class SVGPath {
  path: string[] = [];

  push(...args: string[]) {
    this.path.push(Array.prototype.join.call(args, " "));
    return this;
  }

  reset() {
    this.path = [];
    return this;
  }

  move = point("m");

  moveTo = point("M");

  line = point("l");

  lineTo = point("L");

  curve = curve("t", "s", "q", "c");

  curveTo = curve("T", "S", "Q", "C");

  arc = arc("a", 1);

  arcTo = arc("A", 1);

  counterArc = arc("a", 0);

  counterArcTo = arc("A", 0);

  close() {
    return this.push("z");
  }

  toSVG() {
    return this.path.join(" ");
  }

  toString() {
    return this.toSVG();
  }
}


const transformOrigin = (xCenter: number, yCenter: number) => {
  const x1toX2 = (x1: number) => x1 - xCenter;
  const x2toX1 = (x2: number) => x2 + xCenter;
  const y1toY2 = (y1: number) => (y1 * -1) - yCenter;
  const y2toY1 = (y2: number) => (y2 * -1) + yCenter;
  return {
    canvasToCartesian: (x: number, y: number) => [x1toX2(x), y1toY2(y)],
    cartesianToCanvas: (x: number, y: number) => [x2toX1(x), y2toY1(y)],
    polarToCartesian: (ϑ: number, r: number) => [r * Math.cos(ϑ), r * Math.sin(ϑ)],
    polarToCanvas: (ϑ: number, r: number) => [x2toX1(r * Math.cos(ϑ)), y2toY1(r * Math.sin(ϑ))],
  };
};

// eslint-disable-next-line import/prefer-default-export
export const drawArc = ({
  x, y, radius, startAngle, endAngle, strokeWidth,
}: { x: number, y: number, radius: number, startAngle: number, endAngle: number, strokeWidth: number }) => {
  const o = transformOrigin(x, y);
  const padding = strokeWidth / 2;
  const d = new SVGPath()
    .moveTo(...o.polarToCanvas(startAngle, radius).map(c => c + padding))
    .arcTo(radius + padding, padding, radius)
    .arcTo(...o.polarToCanvas(endAngle, radius).map(c => c + padding), radius)
    .toSVG();
  return d;
};
