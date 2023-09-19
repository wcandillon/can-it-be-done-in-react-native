import {
  Circle,
  Group,
  Path,
  Skia,
  SweepGradient,
  type Vector,
  Shadow,
  PathOp,
  Shader,
  Fill,
  mixColors,
} from "@shopify/react-native-skia";
import React, { useEffect, useMemo } from "react";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { frag } from "../components";

const source = frag`
uniform shader image;
uniform vec4 color;
uniform vec2 pos;
uniform float progress;

vec4 main(vec2 xy) {
  if (progress > 1) {
    return color;
  }
  return image.eval(pos);
}
`;

const fromCircle = (center: Vector, r: number) => {
  "worklet";
  return Skia.XYWHRect(center.x - r, center.y - r, r * 2, r * 2);
};

interface Ring {
  colors: string[];
  background: string;
  size: number;
  totalProgress: number;
}

interface RingProps {
  ring: Ring;
  center: Vector;
  strokeWidth: number;
}

export const Ring = ({
  center,
  strokeWidth,
  ring: { size, background, totalProgress, colors },
}: RingProps) => {
  const r = size / 2 - strokeWidth;
  const trim = useSharedValue(0);
  const originalPath = useMemo(() => {
    const container = fromCircle(center, r);
    const p = Skia.Path.Make();
    const circles = Math.ceil(totalProgress);
    for (let i = 0; i < circles; i++) {
      const e = i === circles - 1 ? totalProgress % 1 : 1;
      p.addArc(container, 0, e * 360);
    }
    return p;
  }, [center, r, totalProgress]);
  const path = useDerivedValue(() => {
    if (trim.value >= 1) {
      return originalPath;
    }
    return originalPath.copy().trim(0, trim.value, false)!;
  });
  const clip = useMemo(() => {
    const outerCircle = Skia.Path.Make();
    outerCircle.addCircle(center.x, center.y, r + strokeWidth / 2);
    const innerCircle = Skia.Path.Make();
    innerCircle.addCircle(center.x, center.y, r - strokeWidth / 2);
    return Skia.Path.MakeFromOp(outerCircle, innerCircle, PathOp.Difference)!;
  }, [center.x, center.y, r, strokeWidth]);
  const head = useDerivedValue(() => {
    const c = path.value.getLastPt();
    const p = Skia.Path.Make();
    p.addCircle(c.x, c.y, strokeWidth / 2);
    const current = trim.value * totalProgress;
    const rotate = 2 * Math.PI * (current % 1);
    const m = Skia.Matrix();
    m.translate(c.x, c.y);
    m.rotate(rotate);
    m.translate(-c.x, -c.y);
    p.transform(m);
    return p;
  });
  const headClip = useDerivedValue(() => {
    const c = path.value.getLastPt();
    const h = Skia.Path.Make();
    const current = trim.value * totalProgress;
    const rotate = 2 * Math.PI * (current % 1);
    h.addRect(
      Skia.XYWHRect(c.x - strokeWidth, c.y - 1, strokeWidth * 2, strokeWidth)
    );
    const m = Skia.Matrix();
    m.translate(c.x, c.y);
    m.rotate(rotate);
    m.translate(-c.x, -c.y);
    h.transform(m);
    return h;
  });
  const matrix = useDerivedValue(() => {
    const current = trim.value * totalProgress;
    const frac = current > 1 ? current % 1 : 0;
    const m = Skia.Matrix();
    m.translate(center.x, center.y);
    m.rotate(2 * Math.PI * frac);
    m.translate(-center.x, -center.y);
    return m;
  });
  const headColor = useDerivedValue(() => {
    const current = trim.value * totalProgress;
    if (current < 1) {
      return [...mixColors(trim.value, colors[0], colors[1])];
    } else {
      return colors[1];
    }
  });
  const uniforms = useDerivedValue(() => {
    const c = path.value.getLastPt();
    return {
      color: [...Skia.Color(colors[1])],
      progress: trim.value * totalProgress,
      pos: c,
    };
  });
  useEffect(() => {
    trim.value = withTiming(1, { duration: 3000 });
  }, [trim]);
  return (
    <Group origin={center} transform={[{ rotate: -Math.PI / 2 }]}>
      <Group clip={clip}>
        <Fill color={background} />
        <Circle
          c={originalPath.getPoint(0)}
          r={strokeWidth / 2}
          color={colors[0]}
        />
        <Path
          path={path}
          style="stroke"
          strokeWidth={strokeWidth}
          color={colors[0]}
        >
          <SweepGradient c={center} colors={colors} matrix={matrix} />
        </Path>
        <Path path={head} color={headColor} clip={headClip}>
          <Shadow dx={0} dy={0} blur={10} color="black" />
          <Shader source={source} uniforms={uniforms}>
            <SweepGradient c={center} colors={colors} matrix={matrix} />
          </Shader>
        </Path>
      </Group>
    </Group>
  );
};
