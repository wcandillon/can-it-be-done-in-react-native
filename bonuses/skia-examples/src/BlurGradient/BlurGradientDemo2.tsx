import type { SkImage } from "@shopify/react-native-skia";
import {
  Canvas,
  ImageShader,
  vec,
  RadialGradient,
  makeImageFromView,
  Fill,
  Line,
  LinearGradient,
} from "@shopify/react-native-skia";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { BlurGradient } from "./BlurGradient";

const { width, height } = Dimensions.get("window");
const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const BlurGradientDemo = () => {
  const ref = useRef<View>(null);
  const [image, setImage] = useState<null | SkImage>(null);
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollY.value = -y;
    },
  });
  useEffect(() => {
    (async () => {
      if (ref.current) {
        await wait(1000);
        const snapshot = await makeImageFromView(ref);
        setImage(snapshot);
      } else {
        console.log("The view is not mounted yet");
      }
    })();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }} ref={ref}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          vehicula eget diam vel commodo. Donec tempor varius pretium. Donec
          vehicula a nunc vel euismod. Duis nec dui enim. Ut semper eget enim
          sed porttitor. Pellentesque viverra, nisi id tristique varius, risus
          elit sagittis ex, sit amet iaculis turpis eros vitae lorem. Donec at
          mollis ligula, sit amet scelerisque diam. Curabitur non gravida
          mauris. Suspendisse blandit mattis interdum. Sed rhoncus elit non
          justo suscipit, at commodo est consequat. Nullam congue nisi vel ante
          tempus, sed congue nisl lobortis. Integer gravida at ante quis
          volutpat. Quisque porta, nulla id placerat ullamcorper, odio magna
          bibendum neque, ac ullamcorper augue felis at velit. Donec sed
          tincidunt arcu, facilisis vulputate orci. Nunc tristique velit quis
          ipsum maximus, sed suscipit massa gravida. Duis imperdiet convallis
          sem, vitae condimentum nisi consectetur et. Cras ut blandit nulla.
          Duis neque risus, rutrum quis tortor a, euismod sodales dolor. Fusce
          mauris ipsum, ultricies non neque eu, elementum suscipit nisi. Nam vel
          dui porta, eleifend enim sed, egestas lacus. Aenean varius felis
          euismod erat eleifend placerat. Nam eget fringilla odio, ultricies
          tempor magna. Morbi viverra sed purus sit amet molestie. Vivamus
          dapibus vulputate eros, ac consequat turpis efficitur laoreet.
          Phasellus cursus sodales neque, in fringilla turpis sodales eget.
          Nulla ut mi odio. Duis faucibus congue imperdiet. In et turpis a diam
          convallis pellentesque. Nulla vehicula suscipit pharetra. Aenean ac
          eleifend justo. Suspendisse laoreet erat a augue malesuada semper.
          Etiam sodales luctus volutpat. Suspendisse ac fringilla lacus. Nam
          mauris dui, dapibus vitae enim in, accumsan varius ipsum. Maecenas
          commodo vestibulum magna, vitae auctor mi mattis sed. Sed commodo
          lacus id nunc bibendum, vestibulum mollis turpis luctus. Integer
          euismod sem at felis congue feugiat. Duis vel est quis elit sodales
          consequat. Maecenas efficitur dignissim malesuada. Donec egestas in
          nisl quis tincidunt. Fusce ac libero mauris. Vestibulum in enim in
          mauris finibus sollicitudin vitae ac neque. Quisque sed dui id nibh
          pulvinar auctor ac ac sem. Suspendisse quis pharetra tellus. In
          ultricies commodo accumsan.
        </Text>
      </View>
      {image && (
        <Canvas style={StyleSheet.absoluteFill}>
          <Fill color="white" />
          <BlurGradient
            mask={
              <LinearGradient
                start={vec(0, 0)}
                end={vec(0, 100)}
                colors={["black", "transparent"]}
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
        </Canvas>
      )}
      <View style={StyleSheet.absoluteFill}>
        <Animated.ScrollView scrollEventThrottle={16} onScroll={onScroll} />
      </View>
    </View>
  );
};
