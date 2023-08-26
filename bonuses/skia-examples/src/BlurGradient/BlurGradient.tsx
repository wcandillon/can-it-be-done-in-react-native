import {
  Canvas,
  useImage,
  Image,
  Group,
  Skia,
  LinearGradient,
  Rect,
  vec,
  rect,
  BackdropFilter,
  Blur,
  Mask,
  Fill,
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
        {/* <Image
          image={image}
          x={0}
          y={0}
          width={width}
          height={height}
          fit="cover"
        /> */}
        {/* <Group matrix={matrix} /> */}

        <Group matrix={matrix}>
          <Image
            image={image}
            x={0}
            y={0}
            width={width}
            height={height}
            fit="cover"
          />
          <Mask
            mode="luminance"
            mask={
              <Rect rect={rect(0, 0, width, height)}>
                <LinearGradient
                  start={vec(0, height)}
                  end={vec(0, height / 2)}
                  positions={[0.5, 1]}
                  colors={["white", "black"]}
                />
              </Rect>
            }
          >
            <Image
              image={image}
              x={0}
              y={0}
              width={width}
              height={height}
              fit="cover"
            >
              <Blur blur={40} mode="clamp" />
            </Image>
          </Mask>
        </Group>
      </Canvas>
      <View style={StyleSheet.absoluteFill}>
        <Animated.ScrollView scrollEventThrottle={16} onScroll={onScroll} />
      </View>
    </View>
  );
};
