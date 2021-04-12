import React from "react";
import { View } from "react-native";

import Picture from "./Picture";

export const assets = [
  require("./assets/1.jpg"),
  require("./assets/2.jpg"),
  require("./assets/3.jpg"),
  require("./assets/4.jpg"),
  require("./assets/5.jpg"),
  require("./assets/6.jpg"),
];

const Darkroom = () => {
  return (
    <View>
      <Picture source={assets[0]} />
    </View>
  );
};

export default Darkroom;
