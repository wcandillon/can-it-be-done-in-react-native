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

export const initialWaveCenter = height * 0.7167487685;

export const sideWidth = (progress: Animated.Node<number>) => {
  return cond(
    lessOrEq(progress, 0.2),
    initialSideWidth,
    cond(
      greaterOrEq(progress, 0.8),
      width,
      add(
        initialSideWidth,
        divide(
          multiply(width - initialSideWidth, sub(progress, 0.2)),
          0.8 - 0.2
        )
      )
    )
  );
};

export const waveVertRadius = (progress: Animated.Node<number>) => {
  return cond(
    lessOrEq(progress, 0),
    initialVertRadius,
    cond(
      greaterOrEq(progress, 0.4),
      maxVertRadius,
      add(
        initialVertRadius,
        divide(multiply(sub(maxVertRadius, initialVertRadius), progress), 0.4)
      )
    )
  );
};

export const waveHorRadius = (progress: Animated.Node<number>) => {
  const p1 = 0.4;
  const t = divide(sub(progress, p1), sub(1, p1));
  const A = maxHorRadius;
  const r = 40;
  const m = 9.8;
  const beta = r / (2 * m);
  const k = 50;
  const omega0 = k / m;
  // eslint-disable-next-line no-restricted-properties
  const omega = Math.pow(-Math.pow(beta, 2) + Math.pow(omega0, 2), 0.5);
  return cond(
    lessOrEq(progress, 0),
    initialHorRadius,
    cond(
      greaterOrEq(progress, 1),
      0,
      cond(
        lessOrEq(progress, p1),
        add(
          initialHorRadius,
          multiply(divide(progress, p1), sub(maxHorRadius, initialHorRadius))
        ),
        multiply(A, exp(multiply(-1, beta, t)), cos(multiply(omega, t)))
      )
    )
  );
};
