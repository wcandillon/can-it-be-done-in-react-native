import type { SkFont, SkiaValue, SkPath } from "@shopify/react-native-skia";
import {
  mix,
  useComputedValue,
  rect,
  rrect,
  Shadow,
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
  active: SkiaValue<number>;
}

export const Room = ({
  colors,
  name,
  boldFont,
  font,
  icon,
  active,
}: RoomProps) => {
  const progress = 0.61;
  const x = 335 * progress;
  const opacity = useComputedValue(() => {
    return 1 - active.current;
  }, [active]);
  const r1 = useComputedValue(() => {
    const h = mix(active.current, 24, 94);
    const y = mix(active.current, 94 - 24, 0);
    return rrect(rect(x, y, 24, h), 12, 12);
  }, [active]);
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
      <RoundedRect x={20} y={94 - 24} width={x} height={24} r={12}>
        <LinearGradient
          start={vec(20, 94 - 24)}
          end={vec(20 + x, 94 - 24)}
          colors={["rgba(255, 255, 255, 0.01)", "rgba(255, 255, 255, 0.95)"]}
        />
      </RoundedRect>
      <RoundedRect color="white" rect={r1}>
        <Shadow dx={0} dy={0} color="rgba(0, 0, 0, 0.6)" blur={2} />
      </RoundedRect>
      <Group
        transform={[{ translateX: 290 }, { translateY: 25 }]}
        opacity={opacity}
      >
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
