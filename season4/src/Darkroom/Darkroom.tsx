import React from "react";
import { View } from "react-native";

import Picture from "./Picture";

export const assets = [require("./assets/1.jpg"), require("./assets/2.jpg")];

const Darkroom = () => {
  return (
    <View>
      <Picture source={assets[0]} />
    </View>
  );
};

export default Darkroom;
