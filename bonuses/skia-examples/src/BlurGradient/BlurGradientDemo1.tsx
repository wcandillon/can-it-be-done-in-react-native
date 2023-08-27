import {
  Canvas,
  useImage,
  ImageShader,
  vec,
  RadialGradient,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { Title } from "./Title";
import { BlurGradient } from "./BlurGradient";

const { width, height } = Dimensions.get("window");

export const BlurGradientDemo = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const image = useImage(require("./zurich3.jpg"));
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollY.value = -y;
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <Canvas style={{ flex: 1 }}>
        <BlurGradient
          mask={
            <RadialGradient
              c={vec(width / 2, height / 2)}
              r={width}
              colors={["transparent", "transparent", "black"]}
            />
          }
        >
          <ImageShader
            image={image}
            x={0}
            y={scrollY}
            width={width}
            height={height}
            fit="cover"
          />
        </BlurGradient>
        <Title />
      </Canvas>
      <View style={StyleSheet.absoluteFill}>
        <Animated.ScrollView scrollEventThrottle={16} onScroll={onScroll} />
      </View>
    </View>
  );
};
