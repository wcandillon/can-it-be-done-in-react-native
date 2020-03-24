import React from "react";
import { Image, View } from "react-native";
import MaskedView from "@react-native-community/masked-view";

interface AngularGradient2Props {
  size: number;
  colors: [string, string];
}

export default ({ size, colors: [start, end] }: AngularGradient2Props) => {
  const maskElement = (
    <Image
      style={{
        width: size,
        height: size,
        backgroundColor: "transparent",
        borderRadius: size / 2,
      }}
      source={require("./mask.png")}
    />
  );
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: start,
        borderRadius: size / 2,
      }}
    >
      <MaskedView style={{ flex: 1 }} {...{ maskElement }}>
        <View
          style={{
            flex: 1,
            backgroundColor: end,
            borderRadius: size / 2,
          }}
        />
      </MaskedView>
    </View>
  );
};
