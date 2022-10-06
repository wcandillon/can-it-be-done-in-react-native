import type { SkFont, SkPath } from "@shopify/react-native-skia";
import {
  Group,
  Path,
  LinearGradient,
  RoundedRect,
  vec,
  Text,
} from "@shopify/react-native-skia";
import React from "react";

interface RoomProps {
  colors: string[];
  name: string;
  boldFont: SkFont;
  font: SkFont;
  icon: SkPath;
}

export const Room = ({ colors, name, boldFont, font, icon }: RoomProps) => {
  return (
    <>
      <RoundedRect x={20} y={0} width={335} height={94} r={12}>
        <LinearGradient
          start={vec(20, 0)}
          end={vec(20 + 335, 0)}
          colors={colors}
        />
      </RoundedRect>
      <Group
        transform={[{ scale: 1.5 }, { translateX: 25 }, { translateY: 15 }]}
      >
        <Path color="white" fillType="evenOdd" path={icon} />
      </Group>
      <Text
        x={100}
        y={15 + 18}
        font={boldFont}
        text={name}
        color="rgba(255, 255, 255, 0.97)"
      />
      <Text
        x={100}
        y={15 + 18 + 18}
        font={font}
        text="All lights on"
        color="rgba(255, 255, 255, 0.75)"
      />
      <RoundedRect
        x={20}
        y={94 - 24}
        width={335}
        height={24}
        r={12}
        color="rgba(0,0,0,0.14)"
      />
    </>
  );
};
