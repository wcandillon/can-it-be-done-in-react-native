import {
  Canvas,
  useImage,
  Image,
  Group,
  Skia,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export const BlurGradient = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const image = useImage(require("./zurich.jpg"));
  const matrix = useSharedValue(Skia.Matrix());
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      matrix.value = Skia.Matrix();
      matrix.value.translate(0, -y);
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <Canvas style={{ flex: 1 }}>
        <Group matrix={matrix}>
          <Image
            image={image}
            x={0}
            y={0}
            width={width}
            height={height}
            fit="cover"
          />
        </Group>
      </Canvas>
      <View style={StyleSheet.absoluteFill}>
        <Animated.ScrollView scrollEventThrottle={16} onScroll={onScroll} />
      </View>
    </View>
  );
};
