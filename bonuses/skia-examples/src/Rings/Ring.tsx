import {
  Circle,
  Group,
  Path,
  Skia,
  SweepGradient,
  type Vector,
} from "@shopify/react-native-skia";
import React, { useEffect, useMemo } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";

const fromCircle = (center: Vector, r: number) =>
  Skia.XYWHRect(center.x - r, center.y - r, r * 2, r * 2);

interface Ring {
  colors: string[];
  background: string;
  size: number;
  progress: number;
}

interface RingProps {
  ring: Ring;
  center: Vector;
  strokeWidth: number;
}

export const Ring = ({
  center,
  strokeWidth,
  ring: { size, background, progress, colors },
}: RingProps) => {
  const end = useSharedValue(0);
  const r = size / 2 - strokeWidth;
  const path = useMemo(() => {
    const container = fromCircle(center, r);
    const p = Skia.Path.Make();
    const circles = Math.ceil(progress);
    for (let i = 0; i < circles; i++) {
      const e = i === circles - 1 ? progress % 1 : 1;
      p.addArc(container, 0, e * 360);
    }
    return p;
  }, [center, progress, r]);
  useEffect(() => {
    end.value = withTiming(1, { duration: 3000 });
  }, [end, progress]);
  return (
    <Group transform={[{ rotate: -Math.PI / 2 }]} origin={center}>
      <Circle
        c={center}
        r={r}
        color={background}
        style="stroke"
        strokeCap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        end={end}
        path={path}
        color={colors[0]}
        style="stroke"
        strokeCap="round"
        strokeWidth={strokeWidth}
      >
        <SweepGradient c={center} colors={colors} />
      </Path>
      <Circle c={path.getPoint(0)} r={strokeWidth / 2} color={colors[0]} />
    </Group>
  );
};
