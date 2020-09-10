import { runOnUI } from "react-native-reanimated";
import { useEffect } from "react";

export const useEffectOnUI = (
  cb: Parameters<typeof runOnUI>[0],
  deps: Parameters<typeof useEffect>[1]
  // eslint-disable-next-line react-hooks/exhaustive-deps
) => useEffect(() => runOnUI(cb)(), deps);
