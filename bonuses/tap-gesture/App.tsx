import React from "react";
import { StatusBar } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import LoadAssets from "./components/LoadAssets";
import BlankScreen from "./components/BlankScreen";
import List from "./components/List";

const assets = [
  require("./assets/breakfast.png"),
  require("./assets/vegetarian.png")
];

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      List: {
        screen: List,
        navigationOptions: {
          title: "Recipies",
          headerBackTitle: null
        }
      },
      BlankScreen: {
        screen: BlankScreen,
        navigationOptions: {
          title: "Blank Screen"
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: "#88c33b",
          borderBottomWidth: 0
        },
        headerTintColor: "white"
      }
    }
  )
);

export default () => (
  <LoadAssets {...{ assets }}>
    <StatusBar barStyle="dark-content" />
    <AppNavigator />
  </LoadAssets>
);
