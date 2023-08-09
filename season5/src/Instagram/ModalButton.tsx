import React from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ModalButtonProps {
  size: number;
  onPress: () => void;
}

export const ModalButton = ({ size, onPress }: ModalButtonProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        position: "absolute",
        top: insets.top + 16,
        right: 16,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: "#222121",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable onPress={onPress}>
        <MaterialCommunityIcons
          name="sticker-emoji"
          size={size * 0.55}
          color="white"
        />
      </Pressable>
    </View>
  );
};
