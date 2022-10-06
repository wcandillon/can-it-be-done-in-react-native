/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Canvas,
  ColorMatrix,
  Image,
  useComputedValue,
  useFont,
  useImage,
  useTouchHandler,
  useValue,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";

import { filters, fontSize, photoWidth, Slider } from "./Slider";

const { width, height } = Dimensions.get("window");

export const Photos = () => {
  const offsetX = useValue(0);
  const x = useValue(0);
  const font = useFont(
    require("./assets/SF-Pro-Rounded-Regular.otf"),
    fontSize
  );
  const image = useImage(require("./assets/bg.png"));
  const photo = useImage(require("./assets/zurich.jpg"));
  const onTouch = useTouchHandler({
    onStart: (e) => {
      offsetX.current = e.x - x.current;
    },
    onActive: (e) => {
      x.current = e.x - offsetX.current;
    },
  });
  const filter = useComputedValue(() => {
    return filters[
      Math.min(Math.ceil(-x.current / photoWidth), filters.length - 1)
    ]!.filter;
  }, [x]);
  if (!image || !photo || !font) {
    return null;
  }
  return (
    <Canvas style={{ flex: 1 }} onTouch={onTouch}>
      <Image
        image={image}
        x={0}
        y={0}
        width={width}
        height={height}
        fit="cover"
      />
      <Image
        image={photo}
        x={0}
        y={120}
        width={width}
        height={width * 1.3}
        fit="cover"
      >
        <ColorMatrix matrix={filter} />
      </Image>
      <Slider font={font} photo={photo} x={x} />
    </Canvas>
  );
};
