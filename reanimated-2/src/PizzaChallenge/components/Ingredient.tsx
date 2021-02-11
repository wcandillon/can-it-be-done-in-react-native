import React, { memo, useEffect } from "react";
import { Image } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { mix, polar2Canvas } from "react-native-redash";

import {
  INGREDIENT_SCALE,
  MIN_RADIUS,
  MAX_RADIUS,
  PIZZA_SIZE,
} from "../Config";

interface IngredientProps {
  asset: ReturnType<typeof require>;
  index: number;
  total: number;
  zIndex: number;
}

const randomSign = () => {
  "worklet";
  return Math.round(Math.random()) === 0 ? -1 : 1;
};

const Ingredient = ({ asset, index, total, zIndex }: IngredientProps) => {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withTiming(1, { duration: 250 + 250 * Math.random() });
  }, [progress]);
  const dimension = Image.resolveAssetSource(asset);
  const width = dimension.width * INGREDIENT_SCALE;
  const height = dimension.height * INGREDIENT_SCALE;
  const radius = mix(Math.round(Math.random()), MIN_RADIUS, MAX_RADIUS);
  const theta = (index * 2 * Math.PI) / total;
  const { x, y } = polar2Canvas(
    { radius, theta },
    { x: PIZZA_SIZE / 2 - width / 2, y: PIZZA_SIZE / 2 - height / 2 }
  );
  const s1 = randomSign();
  const s2 = randomSign();
  const style = useAnimatedStyle(() => ({
    opacity: mix(progress.value * 2, 0, 1),
    transform: [
      { translateX: x },
      { translateY: y },
      { translateX: mix(progress.value, (s1 * PIZZA_SIZE) / 2, 0) },
      { translateY: mix(progress.value, (s2 * PIZZA_SIZE) / 2, 0) },
      { scale: mix(progress.value, 3, 1) },
    ],
  }));
  return (
    <Animated.Image
      source={asset}
      style={[
        {
          zIndex,
          position: "absolute",
          top: 0,
          left: 0,
          width,
          height,
        },
        style,
      ]}
    />
  );
};

export default memo(Ingredient);
