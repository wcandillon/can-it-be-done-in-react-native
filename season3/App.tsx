import React from "react";
import { StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";

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
import CoinbasePro from "./src/CoinbasePro";
import Airbnb, {
  assets as airbnbAssets,
  fonts as airbnbFonts
} from "./src/Airbnb";

enableScreens();

const fonts = { ...uberEatsFonts, ...ipodFonts, ...airbnbFonts };
const assets: number[] = [
  ...episodes.map(episode => episode.icon),
  ...liquidSwipeAssets,
  ...chromeAssets,
  ...uberEatsAssets,
  ...airbnbAssets
];

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      Airbnb: {
        screen: Airbnb,
        navigationOptions: {
          title: "Airbnb",
          header: () => null
        }
      },
      Episodes: {
        screen: Episodes,
        navigationOptions: {
          title: "Can it be done in React Native?"
        }
      },
      LiquidSwipe: {
        screen: LiquidSwipe,
        navigationOptions: {
          title: "Liquid Swipe"
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
      },
      AppleActivity: {
        screen: AppleActivity,
        navigationOptions: {
          title: "Activity Rings"
        }
      },
      CoinbasePro: {
        screen: CoinbasePro,
        navigationOptions: {
          title: "Coinbase Pro",
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
