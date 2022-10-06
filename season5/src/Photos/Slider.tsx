import type { SkFont, SkiaValue, SkImage } from "@shopify/react-native-skia";
import {
  ColorMatrix,
  useComputedValue,
  rect,
  Group,
  RoundedRect,
  rrect,
  Text,
  Image,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
export const fontSize = 14;
const padding = 10;
export const photoWidth = 60;
const r = rect(0, 0, 60, 60 * 1.3);
const rct = rrect(r, 4, 4);

interface Filter {
  name: string;
  filter: number[];
}

const f1 = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
const f2 = [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0];
const f3 = [0, 1.0, 0, 0, 0, 0, 1.0, 0, 0, 0, 0, 0.6, 1, 0, 0, 0, 0, 0, 1, 0];
const f4 = [
  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, -0.2, 0.2, 0.1, 0.4, 0, 0, 0, 0, 1, 0,
];
const f5 = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
const f6 = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];

export const filters: Filter[] = [
  { name: "Vivid", filter: f1 },
  { name: "Filter 1", filter: f2 },
  { name: "Filter 2", filter: f3 },
  { name: "Filter 3", filter: f4 },
  { name: "Filter 4", filter: f5 },
  { name: "Filter 5", filter: f6 },
];

interface SliderProps {
  font: SkFont;
  photo: SkImage;
  x: SkiaValue<number>;
}

export const Slider = ({ font, photo, x }: SliderProps) => {
  const transform = useComputedValue(
    () => [
      { translateY: 650 },
      { translateX: (width - photoWidth) / 2 + x.current },
    ],
    [x]
  );
  const text = useComputedValue(() => {
    return filters[
      Math.min(Math.ceil(-x.current / photoWidth), filters.length - 1)
    ]!.name;
  }, [x]);

  const t1 = useComputedValue(() => {
    const textWidth = font.getTextWidth(text.current);
    return [{ translateY: 580 }, { translateX: (width - textWidth) / 2 }];
  }, [text]);

  const r1 = useComputedValue(() => {
    const textWidth = font.getTextWidth(text.current);
    return rrect(
      rect(
        1 - padding,
        2 - padding,
        textWidth + 2 * padding,
        fontSize + 2 * padding
      ),
      6,
      6
    );
  }, [text]);

  return (
    <>
      <Group transform={t1}>
        <RoundedRect rect={r1} color="black" />
        <Text font={font} x={0} y={fontSize} text={text} color="white" />
      </Group>
      <Group transform={transform}>
        {filters.map((filter, i) => (
          <Group key={i} transform={[{ translateX: i * photoWidth }]}>
            <ColorMatrix matrix={filter.filter} />
            <Image image={photo} rect={r} fit="cover" />
          </Group>
        ))}
      </Group>
      <Group
        transform={[
          { translateY: 650 },
          { translateX: (width - photoWidth) / 2 },
        ]}
      >
        <RoundedRect rect={rct} color="white" style="stroke" strokeWidth={4} />
      </Group>
    </>
  );
};
