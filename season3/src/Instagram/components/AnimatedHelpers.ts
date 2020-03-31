import Animated from "react-native-reanimated";

const { Value, block } = Animated;

export interface Vector {
  x: Animated.Adaptable<number>;
  y: Animated.Adaptable<number>;
}

export interface VectorValue {
  x: Animated.Value<number>;
  y: Animated.Value<number>;
}

const create = (x: number, y: number) => ({
  x: new Value(x),
  y: new Value(y)
});

const add = (a: Vector, b: Vector) => ({
  x: Animated.add(a.x, b.x),
  y: Animated.add(a.y, b.y)
});

const sub = (a: Vector, b: Vector) => ({
  x: Animated.sub(a.x, b.x),
  y: Animated.sub(a.y, b.y)
});

const multiply = (a: Vector, b: Vector) => ({
  x: Animated.multiply(a.x, b.x),
  y: Animated.multiply(a.y, b.y)
});

const divide = (a: Vector, b: Vector) => ({
  x: Animated.divide(a.x, b.x),
  y: Animated.divide(a.y, b.y)
});

const set = (a: VectorValue, b: Vector) =>
  block([Animated.set(a.x, b.x), Animated.set(a.y, b.y)]);

const invert = (a: Vector) => multiply({ x: -1, y: -1 }, a);

export const Vector = {
  invert,
  create,
  add,
  sub,
  multiply,
  divide,
  set
};
