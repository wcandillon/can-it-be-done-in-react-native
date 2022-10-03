import {
  BlurMask,
  Canvas,
  Circle,
  Easing,
  Fill,
  Group,
  polar2Canvas,
  vec,
  Shadow,
  useLoop,
  useComputedValue,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";
import { interpolate } from "react-native-reanimated";
import { mix } from "react-native-redash";

const toRad = (deg: number) => (deg * Math.PI) / 180;
//const c1 = "#61bea2";
//const c2 = "#529ca0";
const c3 = "#42B9DB";

const N = 100;
const { width, height } = Dimensions.get("window");
const center = vec(width / 2, height / 2);
const easing = Easing.bezier(0.85, 0, 0.15, 1); //Easing.inOut(Easing.ease);

export const Breathe = () => {
  const progress = { current: 1 }; //useLoop({ duration: 3000 });
  const transform = useComputedValue(
    () => [{ rotate: mix(progress.current, -Math.PI, 0) }],
    [progress]
  );
  return (
    <Canvas style={{ width, height }}>
      <Fill color="black" />
      <Group origin={center} transform={transform} blendMode="screen">
        {new Array(N).fill(0).map((_, n) => {
          const theta = n * toRad(137.5);
          const c1 = interpolate(n, [0, N], [10, 30]);
          const radius = c1 * Math.sqrt(n);
          const { x, y } = polar2Canvas({ theta, radius }, center);
          const r = interpolate(easing(n / N), [0, 1], [5, 45]);
          const cl = c3;
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const c = useComputedValue(() => {
            const cx = mix(progress.current, center.x, x);
            const cy = mix(progress.current, center.y, y);
            return vec(cx, cy);
          }, [progress]);
          return (
            <Group key={n}>
              <Circle c={c} r={r}>
                <Shadow dx={0} dy={0} blur={r / 2} color={cl} shadowOnly />
              </Circle>
              <Circle c={c} r={r} color={cl}>
                <BlurMask blur={r / 2} style="inner" />
              </Circle>
            </Group>
          );
        })}
      </Group>
    </Canvas>
  );
};
