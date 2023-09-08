import React from "react";
import { View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

interface CheckmarkProps {
  checked: boolean;
}

export const Checkmark = ({ checked }: CheckmarkProps) => {
  return (
    <View
      style={{
        borderColor: "#979797",
        borderWidth: 2,
        borderRadius: 8,
        width: 16,
        height: 16,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {checked && <Feather name="check" color="#979797" size={10} />}
    </View>
  );
};
