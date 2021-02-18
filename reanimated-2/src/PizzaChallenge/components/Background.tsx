import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { polar2Canvas } from "react-native-redash";

import { assets, PIZZA_SIZE } from "../Config";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  pizza: {
    width: width + 50,
    height: width + 50,
    justifyContent: "center",
    alignItems: "center",
  },
  plate: {
    width: PIZZA_SIZE,
    height: PIZZA_SIZE,
  },
});

const images = [
  assets.basil[0],
  assets.onion[3],
  assets.mushroom[1],
  assets.broccoli[0],
  assets.sausage[2],
  assets.extra[0],
  assets.extra[1],
];

interface IngredientProps {
  source: typeof images[0];
  index: number;
  total: number;
}

const Ingredient = ({ index, source, total }: IngredientProps) => {
  const dim = Image.resolveAssetSource(source);
  const w = 50;
  const h = (50 * dim.height) / dim.width;
  const radius = width / 2;
  const theta = (index * (2 * Math.PI)) / total;
  const { x, y } = polar2Canvas({ theta, radius }, { x: radius, y: radius });
  const style = {
    ...StyleSheet.absoluteFillObject,
    width: w,
    height: h,
    top: y,
    left: x,
  };
  return <Image source={source} style={style} />;
};

interface BackgroundProps {
  x: Animated.SharedValue<number>;
}

const Background = ({ x }: BackgroundProps) => {
  const style = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${interpolate(x.value, [0, width], [0, 2 * Math.PI])}rad` },
    ],
  }));
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.pizza, style]}>
        {images.map((image, index) => (
          <Ingredient
            key={index}
            index={index}
            source={image}
            total={images.length}
          />
        ))}
        <Image source={assets.plate} style={styles.plate} />
      </Animated.View>
    </View>
  );
};

export default Background;
