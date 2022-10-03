/* eslint-disable max-len */
import type { SkiaValue, SkImage } from "@shopify/react-native-skia";
import {
  LinearGradient,
  ImageShader,
  rect,
  Circle,
  Easing,
  Group,
  Path,
  RadialGradient,
  useComputedValue,
  useLoop,
  vec,
} from "@shopify/react-native-skia";
import React from "react";
import { interpolate } from "react-native-reanimated";

// viewBox="0 0 321 376"

const origin = vec(321 / 2, 376 / 2);
const it = 300;
const i = 1.02;
const j = 0.98;
const inputRange = [
  0.125 * 0,
  0.125 * 1,
  0.125 * 2,
  0.125 * 3,
  0.125 * 4,
  0.125 * 5,
  0.125 * 6,
  0.125 * 7,
  0.125 * 8,
];
const rct = rect(0, 0, 321, 376);

interface ButtonProps {
  image: SkImage;
}

export const Button = ({ image }: ButtonProps) => {
  const beat = useLoop({
    duration: it * inputRange.length,
    easing: Easing.inOut(Easing.ease),
  });
  const center = useComputedValue(
    () => [
      {
        scale: interpolate(
          beat.current,
          inputRange,
          new Array(inputRange.length)
            .fill(0)
            .map((_, idx) => (idx % 2 === 0 ? 1 : 1.1))
        ),
      },
    ],
    [beat]
  );
  const o1 = useComputedValue(
    () => interpolate(beat.current, inputRange, [0, 1, 1, 1, 1, 1, 1, 1, 0]),
    [beat]
  );
  const r1 = useComputedValue(
    () =>
      0.4 *
      interpolate(beat.current, inputRange, [
        0,
        0,
        0,
        0,
        120,
        i * 120,
        j * 120,
        i * 120,
        0,
      ]),
    [beat]
  );
  const o2 = useComputedValue(
    () =>
      0.3 * interpolate(beat.current, inputRange, [0, 1, 1, 1, 1, 1, 1, 1, 0]),
    [beat]
  );
  const r2 = useComputedValue(
    () =>
      interpolate(beat.current, inputRange, [
        0,
        0,
        0,
        150,
        150 * i,
        j * 150,
        150 * i,
        j * 150,
        0,
      ]),
    [beat]
  );
  const o3 = useComputedValue(
    () =>
      0.2 * interpolate(beat.current, inputRange, [0, 1, 1, 1, 1, 1, 1, 1, 0]),
    [beat]
  );
  const r3 = useComputedValue(
    () =>
      interpolate(beat.current, inputRange, [
        0,
        0,
        200,
        200 * i,
        200 * j,
        200 * i,
        200 * j,
        200 * i,
        0,
      ]),
    [beat]
  );
  const o4 = useComputedValue(
    () =>
      0.1 * interpolate(beat.current, inputRange, [0, 1, 1, 1, 1, 1, 1, 1, 0]),
    [beat]
  );
  const r4 = useComputedValue(
    () =>
      interpolate(beat.current, inputRange, [
        0,
        250,
        250 * i,
        250 * j,
        250 * i,
        250 * j,
        250 * i,
        250 * j,
        0,
      ]),
    [beat]
  );
  const o5 = useComputedValue(
    () =>
      0.2 * interpolate(beat.current, inputRange, [0, 1, 1, 1, 1, 1, 1, 1, 1]),
    [beat]
  );
  const di = 1.1;
  const dj = 0.9;
  const r5 = useComputedValue(
    () =>
      interpolate(beat.current, inputRange, [
        275 * di,
        275 * di,
        275 * dj,
        275 * dj,
        275 * di,
        275 * di,
        275 * dj,
        275 * dj,
        275 * di,
      ]),
    [beat]
  );
  const o6 = useComputedValue(
    () =>
      0.2 * interpolate(beat.current, inputRange, [0, 1, 1, 1, 1, 1, 1, 1, 1]),
    [beat]
  );
  const r6 = useComputedValue(
    () =>
      interpolate(beat.current, inputRange, [
        350 * di,
        350 * di,
        350 * dj,
        350 * dj,
        350 * di,
        350 * di,
        350 * dj,
        350 * dj,
        350 * di,
      ]),
    [beat]
  );
  return (
    <>
      <Group opacity={0.5}>
        <Circle
          cx={134}
          cy={132}
          r={r6}
          color="white"
          style="stroke"
          strokeWidth={3}
          opacity={o6}
        />
        <Circle
          cx={134}
          cy={132}
          r={r5}
          color="white"
          style="stroke"
          strokeWidth={3}
          opacity={o5}
        />
        <Circle cx={134} cy={132} r={r1} opacity={o1}>
          <RadialGradient
            c={vec(134, 132)}
            r={r1}
            colors={["rgba(255, 255, 255, 0.25)", "rgba(255, 255, 255, 1)"]}
          />
        </Circle>
        <Circle cx={134} cy={132} r={r2} opacity={o2}>
          <RadialGradient
            c={vec(134, 132)}
            r={r2}
            colors={["rgba(255, 255, 255, 0.25)", "rgba(255, 255, 255, 1)"]}
          />
        </Circle>
        <Circle cx={134} cy={132} r={r3} opacity={o3}>
          <RadialGradient
            c={vec(134, 132)}
            r={r3}
            colors={["rgba(255, 255, 255, 0.25)", "rgba(255, 255, 255, 1)"]}
          />
        </Circle>
        <Circle cx={134} cy={132} r={r4} opacity={o4}>
          <RadialGradient
            c={vec(134, 132)}
            r={120}
            colors={["rgba(255, 255, 255, 0.25)", "rgba(255, 255, 255, 1)"]}
          />
        </Circle>
      </Group>
      <Group origin={origin} transform={center}>
        <Group>
          <Circle cx={134} cy={132} r={84}>
            <ImageShader image={image} rect={rct} fit="cover" />
          </Circle>
          <Circle cx={134} cy={132} r={84}>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.25)", "rgba(255, 255, 255, 0.5)"]}
              start={vec(134 - 84, 132)}
              end={vec(134 + 84, 132)}
            />
          </Circle>
          <Circle cx={134} cy={132} r={83.5} style="stroke" strokeWidth={3}>
            <RadialGradient
              c={vec(134, 132)}
              r={83.5}
              colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
            />
          </Circle>
          <Circle cx={134} cy={132} r={83.5} style="stroke" strokeWidth={3}>
            <RadialGradient
              c={vec(134, 132)}
              r={83.5}
              colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
            />
          </Circle>
        </Group>
        <Path
          fillType="evenOdd"
          path="M89.09 124.358c-1.373 17.857 13.039 34.946 31.934 34.814 6.367-.042 12.397-1.422 17.725-5.034 5.118-3.487 9.337-8.005 13.297-12.697.69-.816 1.164-1.98 1.38-3.054.648-3.444-.99-6.757-4.002-8.437-2.929-1.68-6.241-1.338-8.953 1.116-2.153 1.962-4.209 3.969-6.261 5.971-.652.637-1.305 1.273-1.959 1.908-2.838 2.712-6.193 4.002-10.111 4.218-11.832.6-19.495-11.149-16.351-21.181.949-3.054 2.839-5.418 4.993-7.614 3.654-3.769 7.344-7.538 11.035-11.307a7329.6 7329.6 0 0 0 5.106-5.218c.858-.9 1.764-1.89 2.238-3.012 1.29-2.922.216-6.757-2.238-8.82-2.845-2.365-6.031-2.67-9.127-.775-.816.516-1.59 1.074-2.28 1.764-1.559 1.56-3.127 3.114-4.695 4.669-4.708 4.667-9.423 9.341-13.942 14.184-4.776 5.118-7.23 11.491-7.788 18.505Zm89.825 15.187c1.374-17.899-12.871-34.946-32.192-34.772-6.282-.126-12.264 1.548-17.604 5.166-5.161 3.445-9.337 7.963-13.297 12.697-.516.648-.9 1.464-1.116 2.238-.99 3.438.474 7.098 3.534 8.983 2.97 1.854 6.498 1.596 9.211-.858 2.118-1.928 4.189-3.949 6.248-5.959.658-.642 1.315-1.283 1.972-1.92 2.796-2.712 6.108-4.218 10.068-4.302 7.147-.216 12.397 2.886 15.493 9.252 2.928 6.067 2.322 11.965-2.022 17.257-1.556 1.911-3.286 3.7-5.02 5.494-.379.392-.759.785-1.136 1.179-4.308 4.392-8.611 8.778-12.913 13.17-1.506 1.506-2.064 3.36-1.806 5.424.384 3.229 2.106 5.593 5.118 6.799 3.012 1.206 5.857.6 8.179-1.68 1.076-1.069 2.154-2.136 3.232-3.203 5.299-5.249 10.596-10.495 15.747-15.86 5.076-5.292 7.746-11.833 8.304-19.105Z"
          color="#fff"
        />
      </Group>
    </>
  );
};
