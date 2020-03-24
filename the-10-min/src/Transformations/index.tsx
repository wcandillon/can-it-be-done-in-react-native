import React from "react";
import { Button, View } from "react-native";
import {
  NavigationStackScreenProps,
  createStackNavigator,
} from "react-navigation-stack";

import TransformOrigin from "./TransformOrigin";
import ScaleTransform from "./ScaleTransform";
import Perspective from "./Perspective";
// import 3DTransform from "./3DTransform";

const Transformations = ({
  navigation: { push },
}: NavigationStackScreenProps) => (
  <View>
    <Button onPress={() => push("TransformOrigin")} title="Transform Origin" />
    <Button onPress={() => push("ScaleTransform")} title="Scale Transform" />
    <Button onPress={() => push("Perspective")} title="Perspective" />
    <Button onPress={() => push("3DTransform")} title="3D Transform" />
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
    Perspective: {
      screen: Perspective,
    },
    Transformations: {
      screen: Transformations,
    },
    TransformOrigin: {
      screen: TransformOrigin,
    },
    ScaleTransform: {
      screen: ScaleTransform,
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  }
);
