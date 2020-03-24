import React from "react";
import { Button, View } from "react-native";
import {
  NavigationStackScreenProps,
  createStackNavigator,
} from "react-navigation-stack";

import TransformOrigin from "./TransformOrigin";
import ScaleTransform from "./ScaleTransform";

const Transformations = ({
  navigation: { push },
}: NavigationStackScreenProps) => (
  <View>
    <Button onPress={() => push("TransformOrigin")} title="Transform Origin" />
    <Button onPress={() => push("ScaleTransform")} title="Scale Transform" />
    <Button title="Perspective" />
    <Button title="3D Transform" />
  </View>
);

export const assets = [
  require("./assets/card1.png"),
  require("./assets/card2.png"),
  require("./assets/card3.png"),
  require("./assets/zurich.jpg"),
];

export default createStackNavigator(
  {
    ScaleTransform: {
      screen: ScaleTransform,
    },
    Transformations: {
      screen: Transformations,
    },
    TransformOrigin: {
      screen: TransformOrigin,
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  }
);
