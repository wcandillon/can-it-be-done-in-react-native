import React from "react";
import { Canvas, Fill, Skia } from "@shopify/react-native-skia";

import { stickers } from "./stickers";

export const StickerModal = () => {
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color="rgba(34, 33, 33, 0.85)" />
      {stickers.map((Sticker, index) => (
        <Sticker key={index} matrix={Skia.Matrix()} />
      ))}
    </Canvas>
  );
};
