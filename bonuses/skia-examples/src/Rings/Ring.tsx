import {
  Circle,
  Group,
  Path,
  Skia,
  SweepGradient,
  mixColors,
  type Vector,
  Shadow,
  PathOp,
} from "@shopify/react-native-skia";
import React, { useEffect, useMemo } from "react";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const fromCircle = (center: Vector, r: number) => {
  "worklet";
  return Skia.XYWHRect(center.x - r, center.y - r, r * 2, r * 2);
};

interface Ring {
  colors: Float32Array[];
  background: Float32Array;
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
  const originalPath = useMemo(() => {
    const container = fromCircle(center, r);
    const p = Skia.Path.Make();
    const circles = Math.ceil(progress);
    for (let i = 0; i < circles; i++) {
      const e = i === circles - 1 ? progress % 1 : 1;
      p.addArc(container, 0, e * 360);
    }
    return p;
  }, [center, progress, r]);
  const path = useDerivedValue(() => {
    const p = originalPath.copy();
    p.trim(0, end.value, false);
    return p;
  });
  const head = useDerivedValue(() => {
    const c = path.value.getLastPt();
    const h = Skia.Path.Make();
    const current = end.value * progress;
    const rotate = 2 * Math.PI * (current % 1);
    h.addArc(fromCircle(c, strokeWidth / 2), 0, 180);
    const m = Skia.Matrix();
    m.translate(c.x, c.y);
    m.rotate(rotate);
    m.translate(-c.x, -c.y);
    h.transform(m);
    return h;
  });
  const headClip = useDerivedValue(() => {
    const c = path.value.getLastPt();
    const h = Skia.Path.Make();
    const current = end.value * progress;
    const rotate = 2 * Math.PI * (current % 1);
    h.addRect(
      Skia.XYWHRect(c.x - strokeWidth, c.y, strokeWidth * 2, strokeWidth)
    );
    const m = Skia.Matrix();
    m.translate(c.x, c.y);
    m.rotate(rotate);
    m.translate(-c.x, -c.y);
    h.transform(m);
    return h;
    //return Skia.Path.MakeFromOp(h, circle, PathOp.Intersect)!;
  });
  const matrix = useDerivedValue(() => {
    const current = end.value * progress;
    const frac = current > 1 ? current % 1 : 0;
    const m = Skia.Matrix();
    m.translate(center.x, center.y);
    m.rotate(2 * Math.PI * frac);
    m.translate(-center.x, -center.y);
    return m;
  });
  const headColor = useDerivedValue(() => {
    const current = end.value * progress;
    if (current < 1) {
      return [...mixColors(end.value, colors[0], colors[1])];
    } else {
      return colors[1];
    }
  });
  const clip = useMemo(() => {
    const outerCircle = Skia.Path.Make();
    outerCircle.addCircle(center.x, center.y, r + strokeWidth / 2);
    const innerCircle = Skia.Path.Make();
    innerCircle.addCircle(center.x, center.y, r - strokeWidth / 2);
    return Skia.Path.MakeFromOp(outerCircle, innerCircle, PathOp.Difference)!;
  }, [center.x, center.y, r, strokeWidth]);
  useEffect(() => {
    end.value = withTiming(1, { duration: 3000 });
  }, [end, progress]);
  return (
    <Group clip={clip}>
      <Group transform={[{ rotate: -Math.PI / 2 }]} origin={center}>
        <Circle
          c={center}
          r={r}
          color={background}
          style="stroke"
          strokeCap="round"
          strokeWidth={strokeWidth}
        />
        <Circle
          c={originalPath.getPoint(0)}
          r={strokeWidth / 2}
          color={colors[0]}
        />
        <Path
          path={path}
          color={colors[0]}
          style="stroke"
          strokeWidth={strokeWidth}
        >
          <SweepGradient c={center} colors={colors} matrix={matrix} />
        </Path>
        <Path path={head} color={headColor} clip={headClip}>
          <Shadow dx={0} dy={0} color="black" blur={10} />
        </Path>
        <Path path={head} color={headColor} />
      </Group>
    </Group>
  );
};
