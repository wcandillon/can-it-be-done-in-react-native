import { useNavigation } from "@react-navigation/native";
import {
  Canvas,
  useImage,
  Image,
  useCanvasRef,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, Share, View } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";

import type { Routes } from "../Routes";

import { ModalButton } from "./ModalButton";
import { ShareButton } from "./ShareButton";
import zurich from "./assets/zurich.jpg";
import { useStickerContext } from "./StickerContext";
import { GestureHandler } from "./GestureHandler";
const { width, height } = Dimensions.get("window");
const iconSize = 64;

export const Instagram = () => {
  const ref = useCanvasRef();
  const { stickers } = useStickerContext();
  const { navigate } = useNavigation<StackNavigationProp<Routes>>();
  const image = useImage(zurich);
  if (!image) {
    return null;
  }
  return (
    <View style={{ flex: 1 }}>
      <Canvas style={{ flex: 1 }} ref={ref}>
        <Image
          image={image}
          x={0}
          y={0}
          width={width}
          height={height}
          fit="cover"
        />
        {stickers.map(({ Sticker, matrix }, index) => {
          return <Sticker key={index} matrix={matrix} />;
        })}
      </Canvas>
      {stickers.map(({ size, matrix }, index) => {
        return <GestureHandler key={index} matrix={matrix} size={size} />;
      })}
      <ModalButton size={iconSize} onPress={() => navigate("StickerModal")} />
      <ShareButton
        size={iconSize}
        onPress={() => {
          const img = ref.current!.makeImageSnapshot().encodeToBase64();
          const data = `data:image/png;base64,${img}`;
          Share.share({ url: data });
        }}
      />
    </View>
  );
};
