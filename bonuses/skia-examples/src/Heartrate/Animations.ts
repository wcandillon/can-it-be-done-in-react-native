import { useEffect, useState } from "react";
import type { SharedValue } from "react-native-reanimated";
import {
  Easing,
  cancelAnimation,
  makeMutable,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export const useLoop = ({ duration }: { duration: number }) => {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    return () => {
      cancelAnimation(progress);
    };
  }, [duration, progress]);
  return progress;
};

export const useSharedValues = (...initVal: number[]) => {
  const [mutable] = useState(() => {
    const values: SharedValue<number>[] = [];
    for (const key of initVal) {
      values.push(makeMutable(initVal[key]));
    }
    return values;
  });
  useEffect(() => {
    return () => {
      Object.keys(mutable).forEach((_, i) => {
        cancelAnimation(mutable[i]);
      });
    };
  }, [mutable]);
  return mutable;
};
