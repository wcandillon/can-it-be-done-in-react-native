import { useNavigation } from "@react-navigation/native";
import { Canvas, useFont, useImage, Image } from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, View } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";

import type { Routes } from "../Routes";

import { ModalButton } from "./ModalButton";
import zurich from "./assets/zurich.jpg";
const { width, height } = Dimensions.get("window");
const iconSize = 64;

export const Instagram = () => {
  const { navigate } = useNavigation<StackNavigationProp<Routes>>();
  const image = useImage(zurich);
  if (!image) {
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
