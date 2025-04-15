import { Path, Skia, Canvas, vec, useClock } from "@shopify/react-native-skia";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable } from "react-native";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { createNoise2D } from "../components/SimpleNoise";

import { Play } from "./Play";
import { Background } from "./Background";
import { Overlay } from "./Overlay";

const C = 0.55228474983079;
const F = 20000;
const A = 0.2;
const { width, height } = Dimensions.get("window");
const c = vec(width / 2, height / 2);
const r = 50;
const n1 = createNoise2D();
const n2 = createNoise2D();
const n3 = createNoise2D();
const n4 = createNoise2D();

export const Headspace = () => {
  const [toggled, setToggled] = useState(false);
  const clock = useClock();
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withTiming(toggled ? 1 : 0, {
      duration: 450,
    });
  }, [progress, toggled]);
  const path = useDerivedValue(() => {
    const C1 = C + A * n1(clock.value / F, 0);
    const C2 = C + A * n2(clock.value / F, 0);
    const C3 = C + A * n3(clock.value / F, 0);
    const C4 = C + A * n4(clock.value / F, 0);
    const p = Skia.Path.Make();
    p.moveTo(c.x, c.y - r);
    p.cubicTo(c.x + C1 * r, c.y - r, c.x + r, c.y - C1 * r, c.x + r, c.y);
    p.cubicTo(c.x + r, c.y + C2 * r, c.x + C2 * r, c.y + r, c.x, c.y + r);
    p.cubicTo(c.x - C3 * r, c.y + r, c.x - r, c.y + C3 * r, c.x - r, c.y);
    p.cubicTo(c.x - r, c.y - C4 * r, c.x - C4 * r, c.y - r, c.x, c.y - r);
    const m = Skia.Matrix();
    m.translate(c.x, c.y);
    m.rotate(clock.value / 2000);
    m.translate(-c.x, -c.y);
    p.transform(m);
    return p;
  }, [clock]);

  return (
    <Pressable style={{ flex: 1 }} onPress={() => setToggled((t) => !t)}>
      <Canvas style={{ flex: 1 }}>
        <Background clock={clock} />
        <Path path={path} color="#3B3A3A" />
        <Play progress={progress} c={c} r={r} />
        <Overlay />
      </Canvas>
    </Pressable>
  );
};
