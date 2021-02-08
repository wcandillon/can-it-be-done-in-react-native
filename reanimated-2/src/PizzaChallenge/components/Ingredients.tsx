import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import Ingredient from "./Ingredient";

interface BasilProps {
  assets: ReturnType<typeof require>;
  zIndex: number;
}

const Basil = ({ assets, zIndex }: BasilProps) => {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withTiming(1);
  }, []);
  return (
    <>
      {
        assets.map((asset, index) => (
          <Ingredient zIndex={zIndex} total={assets.length} key={index} asset={asset} progress={progress} index={index} />
        ))
      }
    </>
  );
}

export default Basil;
