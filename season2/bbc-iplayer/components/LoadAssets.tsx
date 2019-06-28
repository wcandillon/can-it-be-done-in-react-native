import React, { useEffect, useState } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";

const usePromiseAll = <T extends {}>(promises: Promise<T>[], cb: () => void) =>
  useEffect(() => {
    (async () => {
      await Promise.all(promises);
      cb();
    })();
  });

const useLoadAssets = (assets: number[]): boolean => {
  const [ready, setReady] = useState(false);
  usePromiseAll(assets.map(asset => Asset.loadAsync(asset)), () =>
    setReady(true)
  );
  return ready;
};

interface LoadAssetsProps {
  assets: number[];
  children: React.ReactElement;
}

export default ({ assets, children }: LoadAssetsProps) => {
  const ready = useLoadAssets(assets);
  if (!ready) {
    return <AppLoading />;
  }
  return children;
};
