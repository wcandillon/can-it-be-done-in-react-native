import { mix, vec, Path, Skia, Fill } from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import { Easing, useDerivedValue } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const c = vec(width / 2, height / 2);

const c1 = "#2ab8aa";
const c2 = "#3a9dbb";
const c3 = "#2a7fb8";
const easing = Easing.bezier(0.37, 0, 0.63, 1).factory();
const getProgress = (t: number, durationInFrames = 4000) => {
  "worklet";
  const p = (t % durationInFrames) / durationInFrames;
  const currentIteration = Math.floor(t / durationInFrames);
  const isGoingBack = currentIteration % 2 === 0;
  const progress = isGoingBack ? 1 - p : p;
  return progress;
};

const getCurve = (start: number, h: number) => {
  "worklet";
  const path = Skia.Path.Make();
  path.moveTo(0, start);
  path.quadTo(width / 2, start - h, width, start);
  path.lineTo(width, height);
  path.lineTo(0, height);
  path.close();
  return path;
};

interface BackgroundProps {
  clock: SharedValue<number>;
}

export const Background = ({ clock }: BackgroundProps) => {
  // getCurve(200, 50);
  const p1 = useDerivedValue(() => {
    const progress = getProgress(clock.value, 4100);
    return getCurve(
      mix(easing(progress), c.y - 300, 200),
      mix(easing(progress), 50, 60)
    );
  }, [clock]);
  const p2 = useDerivedValue(() => {
    const progress = getProgress(clock.value);
    return getCurve(
      mix(easing(progress), c.y - 150, c.y),
      mix(easing(progress), 40, 60)
    );
  }, [clock]);
  const p3 = useDerivedValue(() => {
    const progress = getProgress(clock.value, 3800);
    return getCurve(
      mix(easing(progress), c.y + 75, c.y + 225),
      mix(easing(progress), 30, 50)
    );
  }, [clock]);
  return (
    <>
      <Fill color="#60d1b9" />
      <Path path={p1} color={c1} />
      <Path path={p2} color={c2} />
      <Path path={p3} color={c3} />
    </>
  );
};
