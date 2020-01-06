const { cos, sin } = Math;

export interface Point {
  x: number;
  y: number;
}

export interface PolarPoint {
  theta: number;
  radius: number;
}

const cartesian2Canvas = ({ x, y }: Point, center: Point) => ({
  x: x + center.x,
  y: -y + center.y
});

const polar2Cartesian = ({ theta, radius }: PolarPoint) => ({
  x: radius * cos(theta),
  y: radius * sin(theta)
});

export default ({ theta, radius }: PolarPoint, center: Point) =>
  cartesian2Canvas(polar2Cartesian({ theta, radius }), center);
