import { DangerZone } from "expo";

const { Animated } = DangerZone;
const {
  Value, cond, eq, add, sqrt, neq, pow, sub, and, greaterThan, lessOrEq, multiply, lessThan, divide, abs,
} = Animated;

type Value = typeof Value;
type MixedValue = Value | number;

export const toRad = (deg: MixedValue): MixedValue => multiply(deg, Math.PI / 180);
export const toDeg = (rad: MixedValue): MixedValue => multiply(rad, 180 / Math.PI);

// https://stackoverflow.com/questions/42537957/fast-accurate-atan-arctan-approximation-algorithm
export const atan = (x: Value): Value => sub(
  multiply(Math.PI / 4, x),
  multiply(multiply(x, sub(abs(x), 1)), add(0.2447, multiply(0.0663, abs(x)))),
);

// https://en.wikipedia.org/wiki/Atan2
export const atan2 = (y: Value, x: Value): Value => {
  const expA = add(sqrt(add(pow(x, 2), pow(y, 2))), x);
  const expB = sub(sqrt(add(pow(x, 2), pow(y, 2))), x);
  const cond1 = greaterThan(x, 0);
  const exp1 = multiply(2, atan(divide(y, expA)));
  const cond2 = and(lessOrEq(x, 0), neq(y, 0));
  const exp2 = multiply(2, atan(divide(expB, y)));
  const cond3 = and(lessThan(x, 0), eq(y, 0));
  const exp3 = new Value(Math.PI);
  return cond(
    cond1, exp1,
    cond(cond2, exp2,
      cond(cond3, exp3, new Value(0))),
  );
};
