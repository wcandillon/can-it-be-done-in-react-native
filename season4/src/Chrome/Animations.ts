import { useRef } from "react";
import { useSharedValue as REAuseSharedValue } from "react-native-reanimated";

// Fixed in alpha.8 https://github.com/software-mansion/react-native-reanimated/issues/1293
export const useSharedValue = <T>(value: T) => {
  const ref = useRef<T | null>(null);
  if (ref.current === null) {
    ref.current = value;
  }

  return REAuseSharedValue<T>(ref.current);
};
