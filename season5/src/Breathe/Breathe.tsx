import type { SkiaValue } from "@shopify/react-native-skia";
import {
  mix,
  Canvas,
  Circle,
  Easing,
  Fill,
  Group,
  polar2Canvas,
  vec,
  useComputedValue,
  SweepGradient,
  useValue,
  useTouchHandler,
  runTiming,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";
import { interpolate } from "react-native-reanimated";

const toRad = (deg: number) => (deg * Math.PI) / 180;

const N = 600;
const { width, height } = Dimensions.get("window");
const center = vec(width / 2, height / 2);
const easing = Easing.bezier(0.12, 0, 0.1, 0); // https://easings.net/, https://cubic-bezier.com/#.12,0,.1,-0.01

interface CenterProps {
  progress: SkiaValue<number>;
}

const Center = ({ progress }: CenterProps) => {
  const r = useComputedValue(() => mix(progress.current, 50, 25), [progress]);
  return (
    <Group>
      <Circle c={center} r={r}>
        <SweepGradient
          colors={["yellow", "cyan", "magenta", "yellow"]}
          c={center}
        />
      </Circle>
      <Circle c={center} r={40} />
    </Group>
  );
};

interface CellProps {
  n: number;
  progress: SkiaValue<number>;
}

const Cell = ({ progress, n }: CellProps) => {
  const theta = n * toRad(137.5);
  const c1 = 12;
  const radius = c1 * Math.sqrt(n);
  const { x, y } = polar2Canvas({ theta, radius }, center);
  const r = interpolate(easing(n / N), [0, 1], [0, 8]);
  const c = useComputedValue(() => {
    const s = mix(1 - n / N, 0, 0.5);
    const p = interpolate(progress.current, [s, s + 0.5], [0, 1], "clamp");
    return vec(mix(p, center.x, x), mix(p, center.y, y));
  }, [progress]);
  return <Circle c={c} r={r} />;
};

export const Breathe = () => {
  const progress = useValue(0);
  const onTouch = useTouchHandler({
    onEnd: () => {
      runTiming(progress, progress.current === 1 ? 0 : 1, {
        duration: 1000,
        //   easing: Easing.linear,
      });
    },
  });
  return (
    <Canvas style={{ width, height }} onTouch={onTouch}>
      <Fill color="black" />
      <Group>
        <SweepGradient
          colors={["yellow", "cyan", "magenta", "yellow"]}
          c={center}
        />
        {new Array(N).fill(0).map((_, n) => (
          <Cell key={n} n={n} progress={progress} />
        ))}
      </Group>
      <Center progress={progress} />
    </Canvas>
  );
};
