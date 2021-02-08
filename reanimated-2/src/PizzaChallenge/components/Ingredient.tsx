import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { mix, polar2Canvas } from 'react-native-redash';
import { INGREDIENT_SCALE, MIN_RADIUS, MAX_RADIUS, PIZZA_SIZE } from '../Config';

interface IngredientProps {
  asset: ReturnType<typeof require>;
  progress: Animated.SharedValue<number>;
  index: number;
}

const Ingredient = ({ asset, progress, index }: IngredientProps) => {
  const dimension = Image.resolveAssetSource(asset);
  const width = dimension.width * INGREDIENT_SCALE;
  const height = dimension.height * INGREDIENT_SCALE;
  const radius = mix(Math.round(Math.random()), MIN_RADIUS, MAX_RADIUS);
  const theta = index * 2 * Math.PI/11;
  const {x, y} = polar2Canvas({ radius, theta }, { x: PIZZA_SIZE/2 - width/2, y: PIZZA_SIZE/2-height/2 });
  const side1 = (Math.round(Math.random()) === 0 ? -1 : 1);
  const side2 = (Math.round(Math.random()) === 0 ? -1 : 1);
  const style = useAnimatedStyle(() => ({
    opacity: mix(progress.value * 2, 0, 1),
    transform: [
      { translateX: x },
      { translateY: y },
      { translateX: mix(progress.value, side1 * PIZZA_SIZE/2, 0) },
      { translateY: mix(progress.value, side2 * PIZZA_SIZE/2, 0) },
      { scale: mix(progress.value, 3, 1)}
    ]
  }))
  return (
      <Animated.Image
        source={asset}
        style={[{
          position: "absolute",
          top: 0,
          left: 0,
          width,
          height,
        }, style]}
      />
  );
}

export default Ingredient;
