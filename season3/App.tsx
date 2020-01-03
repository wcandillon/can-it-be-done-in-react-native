import React from "react";
import { StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { LoadAssets, StyleGuide } from "./src/components";
import Episodes, { episodes } from "./src/Episodes";
import Things from "./src/Things";
import Chrome, { assets as chromeAssets } from "./src/Chrome";
import LiquidSwipe, { assets as liquidSwipeAssets } from "./src/LiquidSwipe";
import UberEats, {
  assets as uberEatsAssets,
  fonts as uberEatsFonts
} from "./src/UberEats";
import iPod, { fonts as ipodFonts } from "./src/iPod";
import AppleActivity from "./src/AppleActivity";

const fonts = { ...uberEatsFonts, ...ipodFonts };
const assets: number[] = [
  ...episodes.map(episode => episode.icon),
  ...liquidSwipeAssets,
  ...chromeAssets,
  ...uberEatsAssets
];

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      AppleActivity: {
        screen: AppleActivity,
        navigationOptions: {
          title: "Activity Rings"
        }
      },
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
      },
      UberEats: {
        screen: UberEats,
        navigationOptions: {
          title: "Uber Eats",
          header: () => null
        }
      },
      iPod: {
        screen: iPod,
        navigationOptions: {
          title: "iPod Classic",
          header: () => null
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
  <LoadAssets {...{ assets, fonts }}>
    <StatusBar barStyle="light-content" />
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  </LoadAssets>
);
