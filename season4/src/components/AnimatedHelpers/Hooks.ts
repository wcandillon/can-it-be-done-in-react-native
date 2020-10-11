import { runOnUI } from "react-native-reanimated";
import { useEffect, useRef } from "react";

export const useConst = <T>(initialValue: T | (() => T)): T => {
  const ref = useRef<{ value: T }>();
  if (ref.current === undefined) {
    // Box the value in an object so we can tell if it's initialized even if the initializer
    // returns/is undefined
    ref.current = {
      value:
        typeof initialValue === "function"
          ? // eslint-disable-next-line @typescript-eslint/ban-types
            (initialValue as Function)()
          : initialValue,
    };
  }
  return ref.current.value;
};

export const useEffectOnUI = (
  cb: Parameters<typeof runOnUI>[0],
  deps: Parameters<typeof useEffect>[1]
  // eslint-disable-next-line react-hooks/exhaustive-deps
) => useEffect(() => runOnUI(cb)(), deps);
