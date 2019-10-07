import Animated from "react-native-reanimated";
import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");
const {
  cond,
  lessOrEq,
  greaterOrEq,
  add,
  divide,
  sub,
  multiply,
  exp,
  cos
} = Animated;

export const initialVertRadius = 82;
export const maxVertRadius = height * 0.9;

export const initialHorRadius = 48;
export const maxHorRadius = width * 0.8;

export const initialSideWidth = 15;

export const initialWaveCenter = height * 0.5;

export const sideWidth = (progress: Animated.Node<number>) => {
  const p1 = 0.2;
  const p2 = 0.8;
  return cond(
    lessOrEq(progress, p1),
    initialSideWidth,
    cond(
      greaterOrEq(progress, p2),
      width,
      add(
        initialSideWidth,
        multiply(width - initialSideWidth, divide(sub(progress, p1), p2 - p1))
      )
    )
  );
};

export const waveVertRadius = (progress: Animated.Node<number>) => {
  const p1 = 0.4;
  return cond(
    lessOrEq(progress, 0),
    initialVertRadius,
    cond(
      greaterOrEq(progress, p1),
      maxVertRadius,
      add(
        initialVertRadius,
        multiply(maxVertRadius - initialVertRadius, divide(progress, p1))
      )
    )
  );
};

const waveHorR = (progress: Animated.Node<number>, A: number, B: number) => {
  const p1 = 0.4;
  const t = divide(sub(progress, p1), 1 - p1);
  const r = 40;
  const m = 9.8;
  const beta = r / (2 * m);
  const k = 50;
  const omega0 = k / m;
  const omega = (-(beta ** 2) + omega0 ** 2) ** 0.5;
  return cond(
    lessOrEq(progress, 0),
    initialHorRadius,
    cond(
      greaterOrEq(progress, 1),
      0,
      cond(
        lessOrEq(progress, p1),
        add(initialHorRadius, multiply(divide(progress, p1), B)),
        multiply(A, exp(multiply(-beta, t)), cos(multiply(omega, t)))
      )
    )
  );
};

export const waveHorRadius = (progress: Animated.Node<number>) =>
  waveHorR(progress, maxHorRadius, maxHorRadius - initialHorRadius);

export const waveHorRadiusBack = (progress: Animated.Node<number>) =>
  waveHorR(progress, 2 * initialHorRadius, initialHorRadius);
