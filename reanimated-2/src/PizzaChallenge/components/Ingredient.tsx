import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import { polar2Canvas } from 'react-native-redash';
import { INGREDIENT_SCALE, MIN_RADIUS, MAX_RADIUS, PIZZA_SIZE } from '../Config';

interface IngredientProps {
  asset: ReturnType<typeof require>;
  progress: Animated.SharedValue<number>;
}

const Ingredient = ({ asset, progress }: IngredientProps) => {
  const {width, height} = Image.resolveAssetSource(asset);
  const radius = MIN_RADIUS + MAX_RADIUS * Math.random();
  const theta = Math.random() * 2 * Math.PI;
  const {x, y} = polar2Canvas({ radius, theta }, { x: PIZZA_SIZE/2, y: PIZZA_SIZE/2});
  return (
    <Image
      source={asset}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: width * INGREDIENT_SCALE,
        height: height * INGREDIENT_SCALE,
        transform: [
          { translateX: x },
          { translateY: y }
        ]
      }}
    />
  );
}

export default Ingredient;
