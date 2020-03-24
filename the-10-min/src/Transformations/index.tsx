import React from "react";
import { Button, View } from "react-native";
import {
  NavigationStackScreenProps,
  createStackNavigator
} from "react-navigation-stack";

const Transformations = ({
  navigation: { push }
}: NavigationStackScreenProps) => (
  <View>
    <Button onPress={() => push("TransformOrigin")} title="Transform Origin" />
    <Button title="Scale Transforms" />
    <Button title="Perspective" />
    <Button title="3D Transforms" />
  </View>
);

export default createStackNavigator({
  Transformations: {
    screen: Transformations,
    navigationOptions: {
      title: "Transformations",
      header: null
    }
  },
  TransformOrigin: {
    screen: Transformations,
    navigationOptions: {
      title: "Transformations",
      header: null
    }
  }
});
