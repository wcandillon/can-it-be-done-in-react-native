import React from 'react';
import { View, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import Ingredient from "./Ingredient";

interface BasilProps {
  progress: Animated.SharedValue<number>;
  assets: ReturnType<typeof require>;
}

const Basil = ({ progress, assets }: BasilProps) => {
  return (
    <View>
      {
        assets.map((asset, index) => (
          <Ingredient key={index} asset={asset} progress={progress} index={index} />
        ))
      }
    </View>
  );
}

export default Basil;
