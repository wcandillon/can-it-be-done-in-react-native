import React from "react";
import { Button, View } from "react-native";
import {
  NavigationStackScreenProps,
  createStackNavigator,
} from "react-navigation-stack";

import TransformOrigin from "./TransformOrigin2";
import ScaleTransform from "./ScaleTransform";
import ThreeDTransform from "./3DTransform";

const Transformations = ({
  navigation: { push },
}: NavigationStackScreenProps) => (
  <View>
    <Button onPress={() => push("TransformOrigin")} title="Transform Origin" />
    <Button onPress={() => push("ScaleTransform")} title="Scale Transform" />
    <Button onPress={() => push("ThreeDTransform")} title="3D Transform" />
  </View>
);

export const assets = [
  require("./assets/card1.png"),
  require("./assets/card2.png"),
  require("./assets/card3.png"),
  require("./assets/zurich.jpg"),
  require("./assets/queen-of-spade.png"),
];

export default createStackNavigator(
  {
    TransformOrigin: {
      screen: TransformOrigin,
    },
    Transformations: {
      screen: Transformations,
    },
    ScaleTransform: {
      screen: ScaleTransform,
    },
    ThreeDTransform: {
      screen: ThreeDTransform,
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  }
);
