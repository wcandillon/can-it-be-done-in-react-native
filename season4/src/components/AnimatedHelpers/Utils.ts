import Animated from "react-native-reanimated";

export type SharedValues<
  T extends Record<string, string | number | boolean>
> = {
  [K in keyof T]: Animated.SharedValue<T[K]>;
};

export const swap = (
  v1: Animated.SharedValue<number>,
  v2: Animated.SharedValue<number>
) => {
  const tmp = v1.value;
  v1.value = v2.value;
  v2.value = tmp;
};

export const snapPoint = (
  value: number,
  velocity: number,
  points: readonly number[]
) => {
  const point = value + 0.2 * velocity;
  const deltas = points.map((p) => ({ point: p, delta: Math.abs(point - p) }));
  const minDelta = Math.min(...deltas.map((p) => p.delta));
  return deltas.find((p) => p.delta === minDelta)?.point ?? 0;
};
