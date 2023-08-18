import React from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ShareButtonProps {
  size: number;
  onPress: () => void;
}

export const ShareButton = ({ size, onPress }: ShareButtonProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        position: "absolute",
        top: insets.top + 16,
        left: 16,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: "#222121",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable onPress={onPress}>
        <MaterialCommunityIcons name="share" size={size * 0.55} color="white" />
      </Pressable>
    </View>
  );
};
