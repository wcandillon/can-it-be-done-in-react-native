import React, { ReactNode, useEffect, useState } from "react";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";

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

interface LoadAssetsProps {
  assets: number[];
  children: ReactNode;
}

export default ({ children, assets }: LoadAssetsProps) => {
  const ready = useLoadAssets(assets);
  if (!ready) {
    return <AppLoading />;
  }
  return children;
};
