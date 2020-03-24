import React from "react";
import { Button, View } from "react-native";
import {
  NavigationStackScreenProps,
  createStackNavigator,
} from "react-navigation-stack";

import TransformOrigin from "./TransformOrigin";

const Transformations = ({
  navigation: { push },
}: NavigationStackScreenProps) => (
  <View>
    <Button onPress={() => push("TransformOrigin")} title="Transform Origin" />
    <Button title="Scale Transforms" />
    <Button title="Perspective" />
    <Button title="3D Transforms" />
  </View>
);

export const assets = [
  require("./assets/card1.png"),
  require("./assets/card2.png"),
  require("./assets/card3.png"),
];

export default createStackNavigator({
  TransformOrigin: {
    screen: TransformOrigin,
    navigationOptions: {
      header: null,
    },
  },
  Transformations: {
    screen: Transformations,
    navigationOptions: {
      header: null,
    },
  },
});
