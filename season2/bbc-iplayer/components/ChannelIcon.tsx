import * as React from "react";
import { View } from "react-native";

interface ChannelIconProps {
  name: string;
  r: number;
}

export default ({ name, radius }: ChannelIconProps) => {
  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <View
        style={{
          width: (radius - 8) * 2,
          height: (radius - 8) * 2,
          borderRadius: radius - 8,
          backgroundColor: "rgba(255, 255, 255, 1)"
        }}
      />
    </View>
  );
};
