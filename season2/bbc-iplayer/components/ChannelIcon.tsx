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
        borderRadius: radius,
        backgroundColor: "white"
      }}
    />
  );
};
