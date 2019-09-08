import React from "react";
import { StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { LoadAssets, StyleGuide } from "./src/components";
import Episodes, { episodes } from "./src/Episodes";
import Things from "./src/Things";

const assets: number[] = [...episodes.map(episode => episode.icon)];

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      Things: {
        screen: Things,
        navigationOptions: { title: "Things" }
      },
      Episodes: {
        screen: Episodes,
        navigationOptions: {
          title: "Can it be done in React Native?",
          headerBackTitle: null
        }
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
