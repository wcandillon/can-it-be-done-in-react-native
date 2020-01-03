const { atan2, cos, sin, sqrt } = Math;

export interface Point {
  x: number;
  y: number;
}

export interface PolarPoint {
  alpha: number;
  radius: number;
}

export const canvas2Cartesian = ({ x, y }: Point, center: Point) => {
  return {
    x: x - center.x,
    y: -1 * (y - center.y)
  };
};

export const cartesian2Canvas = ({ x, y }: Point, center: Point) => ({
  x: x + center.x,
  y: -y + center.y
});

export const cartesian2Polar = ({ x, y }: Point) => {
  return {
    alpha: atan2(y, x),
    radius: sqrt(x ** 2 + y ** 2)
  };
};

export const polar2Cartesian = ({ alpha, radius }: PolarPoint) => ({
  x: radius * cos(alpha),
  y: radius * sin(alpha)
});

export const polar2Canvas = ({ alpha, radius }: PolarPoint, center: Point) =>
  cartesian2Canvas(polar2Cartesian({ alpha, radius }), center);

export const canvas2Polar = ({ x, y }: Point, center: Point) =>
  cartesian2Polar(canvas2Cartesian({ x, y }, center));
