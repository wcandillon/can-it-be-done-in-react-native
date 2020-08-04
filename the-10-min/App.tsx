import React from "react";
import { StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { LoadAssets, StyleGuide } from "./src/components";
import Examples, { examples } from "./src/Examples";
import AngularGradient from "./src/AngularGradient";
import Accordion from "./src/Accordion";
import ShaderAndMask from "./src/ShaderAndMask";
import CircularProgress from "./src/CircularProgress";
import Slider, { assets as sliderAssets } from "./src/Slider";
import Tabbar from "./src/Tabbar";
import Menu from "./src/Menu";
import TapGesture from "./src/TapGesture";
import Transformations, {
  assets as transformAssets,
} from "./src/Transformations";
import PinchGesture from "./src/PinchGesture";
import RotationGesture from "./src/RotationGesture";
import Skew from "./src/Skew";
import Transformation3D from "./src/Transformation3D";
import Swiper, { assets as swiperAssets } from "./src/Swiper";
import Wallet from "./src/Wallet";
import Trigonometry from "./src/Trigonometry";
import Ripple from "./src/Ripple";
import Picker from "./src/Picker";
import JellyScroll from "./src/JellyScroll";

const assets: number[] = [
  ...examples.map((example) => example.source),
  ...sliderAssets,
  ...transformAssets,
  ...swiperAssets,
];
const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
};

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      JellyScroll: {
        screen: JellyScroll,
        navigationOptions: {
          title: "Jelly Scroll",
        },
      },
      Ripple: {
        screen: Ripple,
        navigationOptions: {
          title: "Ripple Effect",
        },
      },
      Examples: {
        screen: Examples,
        navigationOptions: {
          title: "The 10-min React Native",
          headerBackTitle: null,
        },
      },
      Slider: {
        screen: Slider,
        navigationOptions: {
          title: "Custom Slider",
        },
      },
      CircularProgress: {
        screen: CircularProgress,
        navigationOptions: {
          title: "Circular Progress",
        },
      },
      AngularGradient: {
        screen: AngularGradient,
        navigationOptions: {
          title: "Angular Gradient",
        },
      },
      Accordion: {
        screen: Accordion,
        navigationOptions: {
          title: "Accordion",
        },
      },
      ShaderAndMask: {
        screen: ShaderAndMask,
        navigationOptions: {
          title: "Shader And Mask",
        },
      },
      Tabbar: {
        screen: Tabbar,
        navigationOptions: {
          title: "Tabbar",
          headerBackTitle: null,
        },
      },
      Menu: {
        screen: Menu,
        navigationOptions: {
          title: "3D Menu",
          headerBackTitle: null,
        },
      },
      TapGesture: {
        screen: TapGesture,
        navigationOptions: {
          title: "Tap Gesture",
        },
      },
      Transform: {
        screen: Transformations,
        navigationOptions: {
          title: "Transformations",
        },
      },
      PinchGesture: {
        screen: PinchGesture,
        navigationOptions: {
          title: "Pinch Gesture",
        },
      },
      RotationGesture: {
        screen: RotationGesture,
        navigationOptions: {
          title: "Rotation Gesture",
        },
      },
      Skew: {
        screen: Skew,
        navigationOptions: {
          title: "Skew Transform",
        },
      },
      Transformation3D: {
        screen: Transformation3D,
        navigationOptions: {
          title: "3D Transformations",
        },
      },
      Swiper: {
        screen: Swiper,
        navigationOptions: {
          title: "Swiper",
        },
      },
      Wallet: {
        screen: Wallet,
        navigationOptions: {
          title: "Wallet",
        },
      },
      Trigonometry: {
        screen: Trigonometry,
        navigationOptions: {
          title: "Trigonometry",
        },
      },
      Picker: {
        screen: Picker,
        navigationOptions: {
          title: "Picker",
        },
      },
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: StyleGuide.palette.primary,
          borderBottomWidth: 0,
        },
        headerTintColor: "white",
      },
      initialRouteName: "Examples",
    }
  )
);

export default () => (
  <LoadAssets {...{ assets, fonts }}>
    <StatusBar barStyle="light-content" />
    <AppNavigator />
  </LoadAssets>
);
