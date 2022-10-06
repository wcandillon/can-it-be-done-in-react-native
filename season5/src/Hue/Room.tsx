import type { SkFont, SkPath } from "@shopify/react-native-skia";
import {
  Shadow,
  Circle,
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
  const progress = 0.61;
  const w = 335 * progress;
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
      <RoundedRect x={20} y={94 - 24} width={w} height={24} r={12}>
        <LinearGradient
          start={vec(20, 94 - 24)}
          end={vec(20 + w, 94 - 24)}
          colors={["rgba(255, 255, 255, 0.01)", "rgba(255, 255, 255, 0.95)"]}
        />
      </RoundedRect>
      <Circle color="white" r={12} cx={w + 12} cy={94 - 12}>
        <Shadow dx={0} dy={0} color="rgba(0, 0, 0, 0.6)" blur={2} />
      </Circle>
      <Group transform={[{ translateX: 290 }, { translateY: 25 }]}>
        <RoundedRect x={0} y={0} width={50} height={30} r={15} opacity={0.154}>
          <Shadow dx={0} dy={0} color="rgba(0, 0, 0, 0.6)" blur={2} inner />
        </RoundedRect>
        <RoundedRect x={22} y={2} width={26} height={26} r={13} color="#fff">
          <Shadow dx={0} dy={0} color="rgba(0, 0, 0, 0.6)" blur={2} />
        </RoundedRect>
      </Group>
    </>
  );
};
