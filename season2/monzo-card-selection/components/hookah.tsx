import { useEffect, useState } from "react";
import { Asset } from "expo-asset";

export const usePromiseAll = <T extends any>(
  promises: Promise<T>[],
  cb: () => void
) =>
  useEffect(() => {
    (async () => {
      await Promise.all(promises);
      cb();
    })();
  });

export const useLoadAssets = (assets: number[]): boolean => {
  const [ready, setReady] = useState(false);
  usePromiseAll(assets.map(asset => Asset.loadAsync(asset)), () =>
    setReady(true)
  );
  return ready;
};
