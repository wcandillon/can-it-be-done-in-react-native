import React from "react";
import {
  Canvas,
  Fill,
  Group,
  Skia,
  fitbox,
  rect,
} from "@shopify/react-native-skia";
import { Dimensions } from "react-native";

import { deflate } from "../components";

import { stickers } from "./stickers";

const window = Dimensions.get("window");
const COLS = 2;
const tileWidth = window.width / COLS;
const tileHeight = 125;

export const StickerModal = () => {
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color="rgb(34, 33, 33)" />
      {stickers.map(({ Sticker, dimensions }, index) => {
        const { width, height } = dimensions;
        const src = rect(0, 0, width, height);
        const row = Math.floor(index / COLS);
        const col = index % COLS;
        const dst = deflate(
          rect(col * tileWidth, row * tileHeight, tileWidth, tileHeight),
          12
        );
        const transform = fitbox("contain", src, dst);
        return (
          <Group key={index} transform={transform}>
            <Sticker matrix={Skia.Matrix()} />
          </Group>
        );
      })}
    </Canvas>
  );
};
