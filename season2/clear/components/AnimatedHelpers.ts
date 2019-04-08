import Color from "color";
import { DangerZone } from "expo";

const { Animated } = DangerZone;
const {
  spring,
  cond,
  set,
  clockRunning,
  startClock,
  stopClock,
  Value,
  add,
  multiply,
  lessThan,
  abs,
  modulo,
  round,
  interpolate,
  divide,
  sub,
  color,
  Extrapolate,
  Clock,
} = Animated;
type Val = typeof Value | number;

export function runSpring(clock: typeof Clock, value: Val, dest: Val) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    damping: 20,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 0.5,
    toValue: new Value(0),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, 0),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
}


function match(condsAndResPairs: Val[], offset = 0) {
  if (condsAndResPairs.length - offset === 1) {
    return condsAndResPairs[offset];
  } if (condsAndResPairs.length - offset === 0) {
    return undefined;
  }
  return cond(
    condsAndResPairs[offset],
    condsAndResPairs[offset + 1],
    match(condsAndResPairs, offset + 2),
  );
}

function colorHSV(h: typeof Value /* 0 - 360 */, s: typeof Value /* 0 - 1 */, v: typeof Value /* 0 - 1 */) {
  // Converts color from HSV format into RGB
  // Formula explained here: https://www.rapidtables.com/convert/color/hsv-to-rgb.html
  const c = multiply(v, s);
  const hh = divide(h, 60);
  const x = multiply(c, sub(1, abs(sub(modulo(hh, 2), 1))));

  const m = sub(v, c);

  const colorRGB = (r: Val, g: Val, b: Val) => color(
    round(multiply(255, add(r, m))),
    round(multiply(255, add(g, m))),
    round(multiply(255, add(b, m))),
  );

  return match([
    lessThan(h, 60),
    colorRGB(c, x, 0),
    lessThan(h, 120),
    colorRGB(x, c, 0),
    lessThan(h, 180),
    colorRGB(0, c, x),
    lessThan(h, 240),
    colorRGB(0, x, c),
    lessThan(h, 300),
    colorRGB(x, 0, c),
    colorRGB(c, 0, x) /* else */,
  ]);
}

export const colorNode = (colorAsString: string) => {
  const c = new Color(colorAsString);
  return color(c.red, c.green, c.blue);
};

export const interpolateColors = (animationValue: typeof Value, inputRange: number[], colorsAsStrings: string[]) => {
  const colors = colorsAsStrings
    .map(c => new Color(c))
    .map(c => c.hsv().object())
    .map(c => ({ h: c.h, s: c.s / 100, v: c.v / 100 }));
  const h = interpolate(animationValue, {
    inputRange,
    outputRange: colors.map(c => c.h),
    extrapolate: Extrapolate.CLAMP,
  });
  const s = interpolate(animationValue, {
    inputRange,
    outputRange: colors.map(c => c.s),
    extrapolate: Extrapolate.CLAMP,
  });
  const v = interpolate(animationValue, {
    inputRange,
    outputRange: colors.map(c => c.v),
    extrapolate: Extrapolate.CLAMP,
  });
  return colorHSV(h, s, v);
};
