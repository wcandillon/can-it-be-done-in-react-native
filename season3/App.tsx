import React from "react";
import { StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { LoadAssets, StyleGuide } from "./src/components";
import Episodes, { episodes } from "./src/Episodes";
import Things from "./src/Things";
import Chrome, { assets as chromeAssets } from "./src/Chrome";
import LiquidSwipe, { assets as liquidSwipeAssets } from "./src/LiquidSwipe";

const assets: number[] = [
  ...episodes.map(episode => episode.icon),
  ...liquidSwipeAssets,
  ...chromeAssets
];

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      Episodes: {
        screen: Episodes,
        navigationOptions: {
          title: "Can it be done in React Native?",
          headerBackTitle: null
        }
      },
      LiquidSwipe: {
        screen: LiquidSwipe,
        navigationOptions: {
          title: "Liquid Swipe",
          gesturesEnabled: false
        }
      },
      Things: {
        screen: Things,
        navigationOptions: { title: "Things" }
      },
      Chrome: {
        screen: Chrome,
        navigationOptions: { title: "Google Chrome" }
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: StyleGuide.palette.primary,
          borderBottomWidth: 0
        },
        headerTintColor: "white"
      }
    }
  )
);

export default () => (
  <LoadAssets {...{ assets }}>
    <StatusBar barStyle="light-content" />
    <AppNavigator />
  </LoadAssets>
);
