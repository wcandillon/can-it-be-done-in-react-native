import {
  Canvas,
  useImage,
  ImageShader,
  vec,
  LinearGradient,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { Title } from "./Title";
import { BlurMask } from "./BlurMask";

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
        <BlurMask
          mask={
            <LinearGradient
              start={vec(0, height * 0.5)}
              end={vec(0, height)}
              colors={["transparent", "black"]}
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
            fm="linear"
            tx="clamp"
            ty="clamp"
          />
        </BlurMask>
        <Title />
      </Canvas>
      <View style={StyleSheet.absoluteFill}>
        <Animated.ScrollView scrollEventThrottle={16} onScroll={onScroll} />
      </View>
    </View>
  );
};
