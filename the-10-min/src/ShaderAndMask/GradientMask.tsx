import React from "react";
import { Image, View } from "react-native";
import MaskedView from "@react-native-community/masked-view";

import { Ring } from "./Constants";

interface AngularGradient2Props {
  ring: Ring;
}

export default ({ ring }: AngularGradient2Props) => {
  const maskElement = (
    <Image
      style={{
        width: ring.size,
        height: ring.size,
        backgroundColor: "transparent",
        borderRadius: ring.size / 2
      }}
      source={require("./mask.png")}
    />
  );
  return (
    <View
      style={{
        width: ring.size,
        height: ring.size,
        backgroundColor: ring.start,
        borderRadius: ring.size / 2
      }}
    >
      <MaskedView style={{ flex: 1 }} {...{ maskElement }}>
        <View
          style={{
            flex: 1,
            backgroundColor: ring.end,
            borderRadius: ring.size / 2
          }}
        />
      </MaskedView>
    </View>
  );
};
