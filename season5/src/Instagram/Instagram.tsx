import { useNavigation } from "@react-navigation/native";
import { Canvas, useFont, useImage, Image } from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, View } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";

import type { Routes } from "../Routes";

import { ModalButton } from "./ModalButton";
import zurich from "./assets/zurich.jpg";
import aveny from "./assets/aveny.ttf";

const { width, height } = Dimensions.get("window");
const iconSize = 64;

//       <Button onPress={() => navigate("StickerModal")} title="Open Modal" />

export const Instagram = () => {
  const { navigate } = useNavigation<StackNavigationProp<Routes>>();
  const image = useImage(zurich);
  const font = useFont(aveny, 56);
  if (!image || !font) {
    return null;
  }
  return (
    <View style={{ flex: 1 }}>
      <Canvas style={{ flex: 1 }}>
        <Image
          image={image}
          x={0}
          y={0}
          width={width}
          height={height}
          fit="cover"
        />
      </Canvas>
      <ModalButton size={iconSize} onPress={() => navigate("StickerModal")} />
    </View>
  );
};
