import { DangerZone } from "expo";

const { Animated } = DangerZone;
const {
  Value, cond, eq, add, sqrt, or, neq, pow, sub, and, greaterThan, modulo, greaterOrEq, lessOrEq, multiply, lessThan, divide, abs, cos, sin,
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
// https://www.gamedev.net/forums/topic/441464-manually-implementing-atan2-or-atan/
export const atan2 = (y: Value, x: Value): Value => {
  const coeff1 = Math.PI / 4;
  const coeff2 = 3 * coeff1;
  const absY = abs(y);
  const angle = cond(greaterOrEq(x, 0), [
    sub(coeff1, multiply(coeff1, divide(sub(x, absY), add(x, absY)))),
  ], [
    sub(coeff2, multiply(coeff1, divide(add(x, absY), sub(absY, x)))),
  ]);
  return cond(lessThan(y, 0), multiply(angle, -1), angle);
};
